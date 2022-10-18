import { Chalk } from "chalk";
import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, setOutput as ghactionsSetOutput, setSecret as ghactionsSetSecret, startGroup as ghactionsStartGroup, warning as ghactionsWarning } from "@actions/core";
import { isJSON as adIsJSON, isString as adIsString, isStringifyJSON as adIsStringifyJSON } from "@hugoalh/advanced-determine";
import nodeFetch from "node-fetch";
import yaml from "yaml";
try {
	const chalk = new Chalk({ level: 3 });
	const iftttMakerURLRegExp = /^https:\/\/maker\.ifttt\.com\/use\/(?<key>(?:[\da-zA-Z][\da-zA-Z_-]*)?[\da-zA-Z])$/gu;
	ghactionsStartGroup(`Import inputs.`);
	let eventName = ghactionsGetInput("eventname");
	if (!adIsString(eventName, { pattern: /^(?:[\da-zA-Z][\da-zA-Z_-]*)?[\da-zA-Z]$/gu })) {
		throw new TypeError(`\`${eventName}\` is not a valid IFTTT webhook event name!`);
	}
	if (!adIsString(eventName, { lowerCase: true })) {
		ghactionsWarning(`Input \`eventname\`'s value \`${eventName}\` is recommended to keep in lower case to prevent issues!`);
	}
	console.log(`${chalk.bold("Event Name:")} ${eventName}`);
	let keyRaw = ghactionsGetInput("key");
	if (!adIsString(keyRaw, { pattern: /^(?:https:\/\/maker\.ifttt\.com\/use\/)?(?:[\da-zA-Z][\da-zA-Z_-]*)?[\da-zA-Z]$/gu })) {
		throw new TypeError(`Input \`key\` is not a valid IFTTT webhook key!`);
	}
	let key;
	if (keyRaw.search(iftttMakerURLRegExp) === 0) {
		key = keyRaw.replace(iftttMakerURLRegExp, "$<key>");
	} else {
		key = keyRaw;
	}
	ghactionsSetSecret(key);
	let arbitrary = ghactionsGetBooleanInput("arbitrary");
	if (typeof arbitrary !== "boolean") {
		throw new TypeError(`Input \`arbitrary\` must be type of boolean!`);
	}
	let payloadRaw = ghactionsGetInput("payload");
	let payload;
	if (adIsStringifyJSON(payloadRaw, { arrayRoot: false })) {
		payload = JSON.parse(payloadRaw);
	} else {
		payload = yaml.parse(payloadRaw);
	}
	if (!adIsJSON(payload, { arrayRoot: false })) {
		throw new TypeError(`\`${payload}\` is not a valid IFTTT webhook JSON/YAML/YML payload!`);
	}
	let payloadStringify = JSON.stringify(payload);
	console.log(`${chalk.bold("Payload:")} ${payloadStringify}`);
	ghactionsEndGroup();
	ghactionsStartGroup(`Post network request to IFTTT.`);
	let response = await nodeFetch(
		`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${key}`,
		{
			body: payloadStringify,
			follow: 1,
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `TriggerIFTTTWebhookApplet.GitHubAction/5.0.0 NodeJS/${process.versions.node}`
			},
			method: "POST",
			redirect: "follow"
		}
	).catch((reason) => {
		throw new Error(`Unexpected web request issue: ${reason?.message}`);
	});
	let responseText = await response.text();
	ghactionsSetOutput("response", responseText);
	ghactionsSetOutput("status_code", response.status);
	ghactionsSetOutput("status_ok", response.ok);
	ghactionsSetOutput("status_text", response.statusText);
	if (!response.ok) {
		throw new Error(`Unexpected response status \`${response.status} ${response.statusText}\`: ${responseText}`);
	}
	console.log(`${chalk.bold("Response Status:")} ${response.status} ${response.statusText}`);
	console.log(`${chalk.bold("Response Content:")} ${responseText}`);
	ghactionsEndGroup();
} catch (error) {
	ghactionsError(error?.message);
	ghactionsEndGroup();
	process.exit(1);
}
