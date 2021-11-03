import { debug as ghactionCoreDebug, error as ghactionCoreError, getInput as ghactionCoreGetInput, info as ghactionCoreInformation, warning as ghactionCoreWarning } from "@actions/core";
import { isJSON as adIsJSON, isString as adIsString } from "@hugoalh/advanced-determine";
import { stringParse as mmStringParse } from "@hugoalh/more-method";
import nodeFetch from "node-fetch";
const ghactionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0";
/**
 * @private
 * @function $importInput
 * @param {string} key
 * @returns {string}
 */
function $importInput(key) {
	ghactionCoreDebug(`Import input \`${key}\`.`);
	return ghactionCoreGetInput(key);
};
(async () => {
	ghactionCoreInformation(`Import inputs.`);
	let dryRun = mmStringParse($importInput("dryrun"));
	if (typeof dryRun !== "boolean") {
		throw new TypeError(`Input \`dryrun\` must be type of boolean!`);
	};
	let eventName = $importInput("eventname");
	if (adIsString(eventName, { pattern: /^[\da-z_-]+$/giu, singleLine: true }) !== true) {
		throw new TypeError(`Input \`eventname\` must be type of string (non-nullable)!`);
	};
	if (adIsString(eventName, { lowerCase: true }) !== true) {
		ghactionCoreWarning(`Input \`eventname\`'s value is recommended to keep in lower case to prevent issue!`);
	};
	let key = $importInput("key");
	if (adIsString(key, { pattern: /^[\da-z_-]+$/giu, singleLine: true }) !== true) {
		throw new TypeError(`Input \`key\` must be type of string (non-nullable)!`);
	};
	let arbitrary = mmStringParse($importInput("arbitrary"));
	if (typeof arbitrary !== "boolean") {
		throw new TypeError(`Input \`arbitrary\` must be type of boolean!`);
	};
	let payload = mmStringParse($importInput("payload"));
	if (adIsJSON(payload) === false) {
		throw new TypeError(`Input \`payload\` must be type of JSON!`);
	};
	let payloadStringify = JSON.stringify(payload);
	if (dryRun === true) {
		ghactionCoreInformation(`Event Name: ${eventName}`);
		ghactionCoreInformation(`Payload Content: ${payloadStringify}`);
		let payloadFakeStringify = JSON.stringify({
			body: "bar",
			title: "foo",
			userId: 1
		});
		ghactionCoreInformation(`Post network request to test service.`);
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
		if (response.ok === true) {
			ghactionCoreInformation(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	} else {
		ghactionCoreDebug(`Event Name: ${eventName}`);
		ghactionCoreDebug(`Payload Content: ${payloadStringify}`);
		ghactionCoreInformation(`Post network request to IFTTT.`);
		let response = await nodeFetch(
			`https://maker.ifttt.com/trigger/${eventName}${(arbitrary === true) ? "/json" : ""}/with/key/${key}`,
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
		if (response.ok === true) {
			ghactionCoreDebug(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	};
})().catch((reason) => {
	ghactionCoreError(reason);
	process.exit(1);
});
