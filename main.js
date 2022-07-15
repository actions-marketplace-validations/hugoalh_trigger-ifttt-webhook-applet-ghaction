import { Chalk } from "chalk";
import { endGroup as ghactionsEndGroup, error as ghactionsError, getBooleanInput as ghactionsGetBooleanInput, getInput as ghactionsGetInput, info as ghactionsInformation, setSecret as ghactionsSetSecret, startGroup as ghactionsStartGroup, warning as ghactionsWarning } from "@actions/core";
import { isJSON as adIsJSON, isString as adIsString } from "@hugoalh/advanced-determine";
import nodeFetch from "node-fetch";
import yaml from "yaml";
const ghactionsChalk = new Chalk({ level: 3 });
const iftttMakerURLRegExp = /^https:\/\/maker\.ifttt\.com\/use\/(?<key>[\da-zA-Z_-]+)$/gu;
(async () => {
	ghactionsStartGroup(`Import inputs.`);
	let eventName = ghactionsGetInput("eventname");
	if (!adIsString(eventName, { pattern: /^[\da-z_-]+$/giu })) {
		throw new TypeError(`\`${eventName}\` is not a valid IFTTT webhook event name!`);
	};
	if (!adIsString(eventName, { lowerCase: true })) {
		ghactionsWarning(`Input \`eventname\`'s value \`${eventName}\` is recommended to keep in lower case to prevent issue!`);
	};
	let key = ghactionsGetInput("key");
	if (!adIsString(key, { pattern: /^(?:https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$/gu })) {
		throw new TypeError(`Input \`key\` is not a valid IFTTT webhook key!`);
	};
	if (key.search(iftttMakerURLRegExp) === 0) {
		key = key.replace(iftttMakerURLRegExp, "$<key>");
	};
	ghactionsSetSecret(key);
	let arbitrary = ghactionsGetBooleanInput("arbitrary");
	if (typeof arbitrary !== "boolean") {
		throw new TypeError(`Input \`arbitrary\` must be type of boolean!`);
	};
	let payload = yaml.parse(ghactionsGetInput("payload"));
	if (!adIsJSON(payload)) {
		throw new TypeError(`\`${payload}\` is not a valid IFTTT webhook JSON/YAML/YML payload!`);
	};
	let payloadStringify = JSON.stringify(payload);
	ghactionsInformation(`${ghactionsChalk.bold("Event Name:")} ${eventName}`);
	ghactionsInformation(`${ghactionsChalk.bold("Payload Content:")} ${payloadStringify}`);
	ghactionsEndGroup();
	ghactionsStartGroup(`Post network request to IFTTT.`);
	let response = await nodeFetch(
		`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${key}`,
		{
			body: payloadStringify,
			follow: 1,
			headers: {
				"Content-Type": "application/json",
				"User-Agent": "TriggerIFTTTWebhookApplet.GitHubAction/4.2.0"
			},
			method: "POST",
			redirect: "follow"
		}
	);
	let responseText = await response.text();
	let result = `${ghactionsChalk.bold("Status Code:")} ${response.status}\n${ghactionsChalk.bold("Response:")} ${responseText}`;
	if (response.ok) {
		ghactionsInformation(result);
	} else {
		throw new Error(result);
	};
})().catch((reason) => {
	ghactionsError(reason);
	ghactionsEndGroup();
	process.exit(1);
});
