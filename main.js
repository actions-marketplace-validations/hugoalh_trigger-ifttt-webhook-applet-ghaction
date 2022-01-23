import { debug as ghactionDebug, error as ghactionError, getInput as ghactionGetInput, info as ghactionInformation, setSecret as ghactionSetSecret, warning as ghactionWarning } from "@actions/core";
import { isJSON as adIsJSON, isString as adIsString } from "@hugoalh/advanced-determine";
import { stringParse as mmStringParse } from "@hugoalh/more-method";
import nodeFetch from "node-fetch";
const ghactionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.1.1";
const reIFTTTMakerURL = /^https:\/\/maker\.ifttt\.com\/use\/(?<key>[\da-zA-Z_-]+)$/gu;
/**
 * @private
 * @function $importInput
 * @param {string} key
 * @returns {string}
 */
function $importInput(key) {
	ghactionDebug(`Import input \`${key}\`.`);
	return ghactionGetInput(key);
};
(async () => {
	ghactionInformation(`Import inputs.`);
	let dryRun = mmStringParse($importInput("dryrun"));
	if (typeof dryRun !== "boolean") {
		throw new TypeError(`Input \`dryrun\` must be type of boolean!`);
	};
	let eventName = $importInput("eventname");
	if (!adIsString(eventName, { pattern: /^[\da-z_-]+$/giu })) {
		throw new TypeError(`Input \`eventname\` must be type of string (non-empty)!`);
	};
	if (!adIsString(eventName, { lowerCase: true })) {
		ghactionWarning(`Input \`eventname\`'s value is recommended to keep in lower case to prevent issue!`);
	};
	let key = $importInput("key");
	if (!adIsString(key, { pattern: /^(?:https:\/\/maker\.ifttt\.com\/use\/)?[\da-zA-Z_-]+$/gu })) {
		throw new TypeError(`Input \`key\` must be type of string (non-empty)!`);
	};
	if (key.search(reIFTTTMakerURL) === 0) {
		key = key.replace(reIFTTTMakerURL, "$<key>");
	};
	ghactionSetSecret(key);
	let arbitrary = mmStringParse($importInput("arbitrary"));
	if (typeof arbitrary !== "boolean") {
		throw new TypeError(`Input \`arbitrary\` must be type of boolean!`);
	};
	let payload = mmStringParse($importInput("payload"));
	if (!adIsJSON(payload)) {
		throw new TypeError(`Input \`payload\` must be type of JSON!`);
	};
	let payloadStringify = JSON.stringify(payload);
	if (dryRun) {
		ghactionInformation(`Event Name: ${eventName}`);
		ghactionInformation(`Payload Content: ${payloadStringify}`);
		let payloadFakeStringify = JSON.stringify({
			body: "bar",
			title: "foo",
			userId: 1
		});
		ghactionInformation(`Post network request to test service.`);
		let response = await nodeFetch(
			`https://jsonplaceholder.typicode.com/posts`,
			{
				body: payloadFakeStringify,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"User-Agent": ghactionUserAgent
				},
				method: "POST",
				redirect: "follow"
			}
		);
		let responseText = await response.text();
		if (response.ok) {
			ghactionInformation(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	} else {
		ghactionDebug(`Event Name: ${eventName}`);
		ghactionDebug(`Payload Content: ${payloadStringify}`);
		ghactionInformation(`Post network request to IFTTT.`);
		let response = await nodeFetch(
			`https://maker.ifttt.com/trigger/${eventName}${arbitrary ? "/json" : ""}/with/key/${key}`,
			{
				body: payloadStringify,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"User-Agent": ghactionUserAgent
				},
				method: "POST",
				redirect: "follow"
			}
		);
		let responseText = await response.text();
		if (response.ok) {
			ghactionDebug(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	};
})().catch((reason) => {
	ghactionError(reason);
	process.exit(1);
});
