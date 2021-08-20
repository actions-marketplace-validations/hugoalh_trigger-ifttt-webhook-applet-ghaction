const advancedDetermine = require("@hugoalh/advanced-determine"),
	ghactionCore = require("@actions/core"),
	ghactionGitHub = require("@actions/github"),
	moreMethod = require("@hugoalh/more-method"),
	nodeFetch = require("node-fetch");
/**
 * @private
 * @function importArgument
 * @param {string} name
 * @returns {string}
 */
function importArgument(name) {
	ghactionCore.info(`Import argument \`${name}\`.`);
	return ghactionCore.getInput(name);
};
(async () => {
	let dryRun = moreMethod.stringParse(importArgument("dryrun"));
	if (typeof dryRun !== "boolean") {
		throw new TypeError(`Argument \`dryrun\` must be type of boolean!`);
	};
	let webhook = importArgument("webhook");
	if (advancedDetermine.isString(webhook) === true) {
		if (advancedDetermine.isStringSingleLine(webhook) !== true) {
			throw new TypeError(`Argument \`webhook\` must be type of string (non-nullable)!`);
		};
		if (webhook.search(/^https:\/\/maker\.ifttt\.com\/trigger\/[0-9_a-z]+\/with\/key\/[0-9_a-z]+$/giu) === 0) {
			webhook = webhook.replace(/^https:\/\/maker\.ifttt\.com\/trigger\/(?<eventName>[0-9_a-z]+)\/with\/key\/(?<key>[0-9_a-z]+)$/giu, "$<key>/$<eventName>");
			let [webhookKey, webhookEventName] = webhook.split("/");
			webhook = {
				eventName: webhookEventName,
				key: webhookKey
			};
		} else if (webhook.search(/^[0-9_a-z]+\/[0-9_a-z]+$/giu) === 0) {
			let [webhookKey, webhookEventName] = webhook.split("/");
			webhook = {
				eventName: webhookEventName,
				key: webhookKey
			};
		} else {
			throw new SyntaxError(`Argument \`webhook\`'s value is not match the require pattern!`);
		};
	} else {
		let webhookEventName = importArgument("webhook_eventname"),
			webhookKey = importArgument("webhook_key");
		if (
			advancedDetermine.isString(webhookEventName) !== true ||
			advancedDetermine.isStringSingleLine(webhookEventName) !== true
		) {
			throw new TypeError(`Argument \`webhook_eventname\` must be type of string (non-nullable)!`);
		};
		if (webhookEventName.search(/^[0-9_a-z]+$/giu) !== 0) {
			throw new SyntaxError(`Argument \`webhook_eventname\`'s value is not match the require pattern!`);
		};
		if (
			advancedDetermine.isString(webhookKey) !== true ||
			advancedDetermine.isStringSingleLine(webhookKey) !== true
		) {
			throw new TypeError(`Argument \`webhook_key\` must be type of string (non-nullable)!`);
		};
		if (webhookKey.search(/^[0-9_a-z]+$/giu) !== 0) {
			throw new SyntaxError(`Argument \`webhook_key\`'s value is not match the require pattern!`);
		};
		webhook = {
			eventName: webhookEventName,
			key: webhookKey
		};
	};
	if (advancedDetermine.isStringLowerCase(webhook.eventName) !== true) {
		ghactionCore.warning(`IFTTT webhook event name is recommended to keep in lower case to prevent issue!`);
	};
	ghactionCore.setSecret(webhook.key);
	let replaceholderConfig = {
			prefix: importArgument("replaceholder_prefix"),
			replaceUndefined: moreMethod.stringParse(importArgument("replaceholder_replaceundefined")),
			suffix: importArgument("replaceholder_suffix"),
			typeTransform: moreMethod.stringParse(importArgument("replaceholder_typetransform"))
		},
		replaceholderList = {
			external: moreMethod.stringParse(importArgument("replaceholder_list_external")),
			payload: ghactionGitHub.context.payload
		};
	if (advancedDetermine.isJSON(replaceholderList.external) === false) {
		throw new TypeError(`Argument \`replaceholder_list_external\` must be type of JSON!`);
	};
	if (typeof replaceholderConfig.replaceUndefined === "string") {
		replaceholderConfig.replaceUndefined = replaceholderConfig.replaceUndefined.replace(/^\\/giu, "");
	};
	let replaceholderService = new moreMethod.Replaceholder(replaceholderList, replaceholderConfig);
	let data = {
		value1: importArgument("value_1"),
		value2: importArgument("value_2"),
		value3: importArgument("value_3")
	};
	if (advancedDetermine.isString(data.value1) !== true) {
		data.value1 = importArgument("value1");
	};
	if (advancedDetermine.isString(data.value2) !== true) {
		data.value2 = importArgument("value2");
	};
	if (advancedDetermine.isString(data.value3) !== true) {
		data.value3 = importArgument("value3");
	};
	let dataExtra = moreMethod.stringParse(importArgument("value_extra"));
	if (advancedDetermine.isJSON(dataExtra) === false) {
		throw new TypeError(`Argument \`value_extra\` must be type of JSON!`);
	};
	ghactionCore.info(`Execute replaceholder service.`);
	webhook.eventName = replaceholderService.replace(webhook.eventName);
	data = replaceholderService.replace(data);
	dataExtra = replaceholderService.replace(dataExtra);
	if (
		advancedDetermine.isString(webhook.eventName) !== true ||
		advancedDetermine.isStringSingleLine(webhook.eventName) !== true
	) {
		throw new TypeError(`Argument \`webhook_eventname\` must be type of string (non-nullable)!`);
	};
	let payload = JSON.stringify(moreMethod.concatenate(data, dataExtra));
	if (dryRun === true) {
		ghactionCore.info(`Webhook Event Name: ${webhook.eventName}`);
		ghactionCore.info(`Network Request Body: ${payload}`);
		let payloadFake = JSON.stringify({ foo: "bar" });
		let response = await nodeFetch(
			`https://jsonplaceholder.typicode.com/posts`,
			{
				body: payloadFake,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"Content-Length": payloadFake.length,
					"User-Agent": "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0"
				},
				method: "POST",
				redirect: "follow"
			}
		);
		if (response.status !== 200) {
			ghactionCore.warning(`Receive status code ${response.status}! May cause error in the beyond.`);
		};
		let responseText = await response.text();
		if (response.ok === true) {
			ghactionCore.info(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	} else {
		ghactionCore.debug(`Webhook Event Name: ${webhook.eventName}`);
		ghactionCore.debug(`Network Request Body: ${payload}`);
		ghactionCore.info(`Post network request to IFTTT.`);
		let response = await nodeFetch(
			`https://maker.ifttt.com/trigger/${webhook.eventName}/with/key/${webhook.key}`,
			{
				body: payload,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"Content-Length": payload.length,
					"User-Agent": "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0"
				},
				method: "POST",
				redirect: "follow"
			}
		);
		ghactionCore.info(`Receive network response from IFTTT.`);
		if (response.status !== 200) {
			ghactionCore.warning(`Receive status code ${response.status}! May cause error in the beyond.`);
		};
		let responseText = await response.text();
		if (response.ok === true) {
			ghactionCore.debug(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	};
})().catch((error) => {
	ghactionCore.error(error);
	process.exit(1);
});
