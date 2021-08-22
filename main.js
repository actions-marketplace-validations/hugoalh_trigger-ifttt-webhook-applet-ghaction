const advancedDetermine = require("@hugoalh/advanced-determine");
const ghactionCore = require("@actions/core");
const ghactionGitHub = require("@actions/github");
const moreMethod = require("@hugoalh/more-method");
const nodeFetch = require("node-fetch");
/**
 * @private
 * @function argumentImport
 * @param {string} key
 * @returns {string}
 */
function argumentImport(key) {
	ghactionCore.debug(`Import argument \`${key}\`.`);
	return ghactionCore.getInput(key);
};
(async () => {
	ghactionCore.info(`Import argument.`);
	let dryRun = moreMethod.stringParse(argumentImport("dryrun"));
	if (typeof dryRun !== "boolean") {
		throw new TypeError(`Argument \`dryrun\` must be type of boolean!`);
	};
	let webhook = argumentImport("webhook");
	if (advancedDetermine.isString(webhook) === true) {
		if (advancedDetermine.isStringSingleLine(webhook) !== true) {
			throw new TypeError(`Argument \`webhook\` must be type of string (non-nullable)!`);
		};
		if (webhook.search(/^https:\/\/maker\.ifttt\.com\/trigger\/[-0-9_a-z]+\/with\/key\/[-0-9_a-z]+$/giu) === 0) {
			webhook = webhook.replace(/^https:\/\/maker\.ifttt\.com\/trigger\/(?<eventName>[-0-9_a-z]+)\/with\/key\/(?<key>[-0-9_a-z]+)$/giu, "$<key>/$<eventName>");
			let [webhookKey, webhookEventName] = webhook.split("/");
			webhook = {
				customPayload: false,
				eventName: webhookEventName,
				key: webhookKey
			};
		} else if (webhook.search(/^https:\/\/maker\.ifttt\.com\/trigger\/[-0-9_a-z]+\/json\/with\/key\/[-0-9_a-z]+$/giu) === 0) {
			webhook = webhook.replace(/^https:\/\/maker\.ifttt\.com\/trigger\/(?<eventName>[-0-9_a-z]+)\/json\/with\/key\/(?<key>[-0-9_a-z]+)$/giu, "$<key>/$<eventName>");
			let [webhookKey, webhookEventName] = webhook.split("/");
			webhook = {
				customPayload: true,
				eventName: webhookEventName,
				key: webhookKey
			};
		} else {
			throw new SyntaxError(`Argument \`webhook\`'s value is not match the require pattern!`);
		};
	} else {
		let webhookCustomPayload = moreMethod.stringParse(argumentImport("webhook_custompayload"));
		let webhookEventName = argumentImport("webhook_eventname");
		let webhookKey = argumentImport("webhook_key");
		if (typeof webhookCustomPayload !== "boolean") {
			throw new TypeError(`Argument \`webhook_custompayload\` must be type of boolean!`);
		};
		if (
			advancedDetermine.isString(webhookEventName) !== true ||
			advancedDetermine.isStringSingleLine(webhookEventName) !== true
		) {
			throw new TypeError(`Argument \`webhook_eventname\` must be type of string (non-nullable)!`);
		};
		if (webhookEventName.search(/^[-0-9_a-z]+$/giu) !== 0) {
			throw new SyntaxError(`Argument \`webhook_eventname\`'s value is not match the require pattern!`);
		};
		if (
			advancedDetermine.isString(webhookKey) !== true ||
			advancedDetermine.isStringSingleLine(webhookKey) !== true
		) {
			throw new TypeError(`Argument \`webhook_key\` must be type of string (non-nullable)!`);
		};
		if (webhookKey.search(/^[-0-9_a-z]+$/giu) !== 0) {
			throw new SyntaxError(`Argument \`webhook_key\`'s value is not match the require pattern!`);
		};
		webhook = {
			customPayload: webhookCustomPayload,
			eventName: webhookEventName,
			key: webhookKey
		};
	};
	ghactionCore.setSecret(webhook.key);
	let replaceholderConfig = {
			prefix: argumentImport("replaceholder_prefix"),
			replaceUndefined: moreMethod.stringParse(argumentImport("replaceholder_replaceundefined")),
			suffix: argumentImport("replaceholder_suffix"),
			typeTransform: moreMethod.stringParse(argumentImport("replaceholder_typetransform"))
		},
		replaceholderList = {
			external: moreMethod.stringParse(argumentImport("replaceholder_list_external")),
			payload: ghactionGitHub.context.payload
		};
	if (typeof replaceholderConfig.replaceUndefined === "string") {
		replaceholderConfig.replaceUndefined = replaceholderConfig.replaceUndefined.replace(/^\\/giu, "");
	};
	if (advancedDetermine.isJSON(replaceholderList.external, { strictKey: true }) === false) {
		throw new TypeError(`Argument \`replaceholder_list_external\` must be type of JSON (no illegal namespace character(s))!`);
	};
	if (advancedDetermine.isJSON(replaceholderList.payload, { strictKey: true }) === false) {
		throw new TypeError(`Argument \`replaceholder_list_payload\` must be type of JSON (no illegal namespace character(s))!`);
	};
	let replaceholderService = new moreMethod.Replaceholder(replaceholderList, replaceholderConfig);
	let payload = {
		value1: argumentImport("value1"),
		value2: argumentImport("value2"),
		value3: argumentImport("value3")
	};
	let payloadExtra = moreMethod.stringParse(argumentImport("payload"));
	if (advancedDetermine.isJSON(payloadExtra, { strictKey: true }) === false) {
		throw new TypeError(`Argument \`payload\` must be type of JSON!`);
	};
	payload = moreMethod.concatenate(payload, payloadExtra);
	ghactionCore.info(`Execute replaceholder service.`);
	webhook.eventName = replaceholderService.replace(webhook.eventName);
	payload = replaceholderService.replace(payload);
	if (
		advancedDetermine.isString(webhook.eventName) !== true ||
		advancedDetermine.isStringSingleLine(webhook.eventName) !== true
	) {
		throw new TypeError(`Argument \`webhook_eventname\` must be type of string (non-nullable)!`);
	};
	if (advancedDetermine.isStringLowerCase(webhook.eventName) !== true) {
		ghactionCore.warning(`IFTTT webhook event name is recommended to keep in lower case to prevent issue!`);
	};
	let payloadStringify = JSON.stringify(payload);
	if (dryRun === true) {
		ghactionCore.info(`Webhook Event Name: ${webhook.eventName}`);
		ghactionCore.info(`Network Request Body (Length: ${payloadStringify.length}): ${payloadStringify}`);
		let payloadFake = JSON.stringify({
			body: "bar",
			title: "foo",
			userId: 1
		});
		ghactionCore.info(`Post network request to test service.`);
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
		ghactionCore.info(`Receive network response from test service.`);
		let responseText = await response.text();
		if (response.ok === true) {
			ghactionCore.info(`Status Code: ${response.status}\nResponse: ${responseText}`);
		} else {
			throw new Error(`Status Code: ${response.status}\nResponse: ${responseText}`);
		};
	} else {
		ghactionCore.debug(`Webhook Event Name: ${webhook.eventName}`);
		ghactionCore.debug(`Network Request Body (Length: ${payloadStringify.length}): ${payloadStringify}`);
		ghactionCore.info(`Post network request to IFTTT.`);
		let response = await nodeFetch(
			`https://maker.ifttt.com/trigger/${webhook.eventName}${(webhook.customPayload === true) ? "/json" : ""}/with/key/${webhook.key}`,
			{
				body: payloadStringify,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"Content-Length": payloadStringify.length,
					"User-Agent": "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0"
				},
				method: "POST",
				redirect: "follow"
			}
		);
		ghactionCore.info(`Receive network response from IFTTT.`);
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
