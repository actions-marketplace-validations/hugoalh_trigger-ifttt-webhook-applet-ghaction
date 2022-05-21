import {
	endGroup as ghactionEndGroup,
	error as ghactionError,
	getInput as ghactionGetInput,
	info as ghactionInformation,
	setSecret as ghactionSetSecret,
	startGroup as ghactionStartGroup,
	warning as ghactionWarning
} from "@actions/core";
import {
	isJSON as adIsJSON,
	isString as adIsString
} from "@hugoalh/advanced-determine";
import { stringParse as mmStringParse } from "@hugoalh/more-method";
import nodeFetch from "node-fetch";
const IFTTTMakerURLRegExp = /^https:\/\/maker\.ifttt\.com\/use\/(?<key>[\da-zA-Z_-]+)$/gu;
(async () => {
	ghactionStartGroup(`Import inputs.`);
	let eventName = ghactionGetInput("eventname");
	if (!adIsString(eventName, { pattern: /^[\da-z_-]+$/giu })) {
		throw new TypeError(`Input \`eventname\` must be type of string and match require pattern!`);
	};
	if (!adIsString(eventName, { lowerCase: true })) {
		ghactionWarning(`Input \`eventname\`'s value is recommended to keep in lower case to prevent issue!`);
	};
	let key = ghactionGetInput("key");
	if (!adIsString(key, { pattern: /^(?:https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$/gu })) {
		throw new TypeError(`Input \`key\` must be type of string and match require pattern!`);
	};
	if (key.search(IFTTTMakerURLRegExp) === 0) {
		key = key.replace(IFTTTMakerURLRegExp, "$<key>");
	};
	ghactionSetSecret(key);
	let arbitrary = mmStringParse(ghactionGetInput("arbitrary"));
	if (typeof arbitrary !== "boolean") {
		throw new TypeError(`Input \`arbitrary\` must be type of boolean!`);
	};
	let payload = mmStringParse(ghactionGetInput("payload"));
	if (!adIsJSON(payload)) {
		throw new TypeError(`Input \`payload\` must be type of JSON!`);
	};
	let payloadStringify = JSON.stringify(payload);
	ghactionInformation(`Event Name: ${eventName}`);
	ghactionInformation(`Payload Content: ${payloadStringify}`);
	ghactionEndGroup();
	ghactionStartGroup(`Post network request to IFTTT.`);
	let response = await nodeFetch(
		`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${key}`,
		{
			body: payloadStringify,
			follow: 1,
			headers: {
				"Content-Type": "application/json",
				"User-Agent": "TriggerIFTTTWebhookApplet.GitHubAction/4.1.2"
			},
			method: "POST",
			redirect: "follow"
		}
	);
	let responseText = await response.text();
	let result = `Status Code: ${response.status}\nResponse: ${responseText}`;
	if (response.ok) {
		ghactionInformation(result);
	} else {
		throw new Error(result);
	};
})().catch((reason) => {
	ghactionError(reason);
	ghactionEndGroup();
	process.exit(1);
});
