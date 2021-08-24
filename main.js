const advancedDetermine = require("@hugoalh/advanced-determine");
const ghactionCore = require("@actions/core");
const ghactionGitHub = require("@actions/github");
const jsonc = require("jsonc").jsonc;
const moreMethod = require("@hugoalh/more-method");
const nodeFetch = require("node-fetch");
const yaml = require("yaml");
const ghactionUserAgent = "TriggerIFTTTWebhookApplet.GitHubAction/4.0.0";
let octokitStorage;
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
/**
 * @private
 * @function githubOctokit
 * @returns {object}
 */
function githubOctokit() {
	if (typeof octokitStorage === "undefined") {
		let githubToken = argumentImport("githubtoken");
		if (advancedDetermine.isString(githubToken) !== true) {
			throw new TypeError(`Argument \`githubtoken\` must be type of string (non-nullable)!`);
		};
		ghactionCore.setSecret(githubToken);
		octokitStorage = ghactionGitHub.getOctokit(
			githubToken,
			{
				log: {
					debug: ghactionCore.debug,
					error: (message) => {
						throw message;
					},
					info: ghactionCore.info,
					warn: ghactionCore.warning
				},
				userAgent: ghactionUserAgent
			}
		).rest;
	};
	return octokitStorage;
};
/**
 * @private
 * @function readRepositoryFile
 * @async
 * @param {string} path
 * @returns {object}
 */
async function readRepositoryFile(path) {
	ghactionCore.info(`Post network request to GitHub.`);
	let [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY.split("/");
	let data = await githubOctokit().repos.getContent({
		owner: repositoryOwner,
		path: path,
		repo: repositoryName
	});
	ghactionCore.info(`Receive network response from GitHub.`);
	let content;
	switch (data.data?.encoding) {
		case "base64":
			content = Buffer.from(data.data.content, "base64").toString("utf8");
			break;
		case "utf-8":
		case "utf8":
			content = data.data.content;
			break;
		default:
			throw new Error(`\`${path}\` is not exist, or using unsupported encoding!`);
	};
	if (path.search(/\.json$/giu) !== -1) {
		return JSON.parse(content);
	};
	if (path.search(/\.jsonc$/giu) !== -1) {
		return jsonc.parse(content);
	};
	if (path.search(/\.ya?ml$/giu) !== -1) {
		return yaml.parse(content);
	};
	throw new Error(`\`${path}\` is not using supported format!`);
};
/**
 * @private
 * @function parseListMatrix
 * @async
 * @param {string} key
 * @returns {object}
 */
async function parseListMatrix(key) {
	let value = argumentImport(key);
	if (advancedDetermine.isString(value) === null) {
		return {};
	};
	if (value.search(/^.+\.(?:jsonc?|ya?ml)$/giu) === 0) {
		return await readRepositoryFile(value);
	};
	if (advancedDetermine.isStringifyJSON(value) !== false) {
		return JSON.parse(value);
	};
	try {
		return jsonc.parse(value);
	} catch {
		try {
			return yaml.parse(value);
		} catch {
			throw new TypeError(`Argument \`${key}\` must be type of string (non-nullable); or JSON, JSONC, or YAML/YML (no illegal namespace character(s))!`);
		};
	};
};
(async () => {
	ghactionCore.info(`Import argument.`);
	let dryRun = moreMethod.stringParse(argumentImport("dryrun"));
	if (typeof dryRun !== "boolean") {
		throw new TypeError(`Argument \`dryrun\` must be type of boolean!`);
	};
	let webhookEventName = argumentImport("webhook_eventname");
	if (
		advancedDetermine.isString(webhookEventName) !== true ||
		advancedDetermine.isStringSingleLine(webhookEventName) !== true
	) {
		throw new TypeError(`Argument \`webhook_eventname\` must be type of string (non-nullable)!`);
	};
	let webhookKey = argumentImport("webhook_key");
	if (
		advancedDetermine.isString(webhookKey) !== true ||
		advancedDetermine.isStringSingleLine(webhookKey) !== true
	) {
		throw new TypeError(`Argument \`webhook_key\` must be type of string (non-nullable)!`);
	};
	if (webhookKey.search(/^[-0-9_a-z]+$/giu) !== 0) {
		throw new SyntaxError(`Argument \`webhook_key\`'s value is not match the require pattern!`);
	};
	ghactionCore.setSecret(webhookKey);
	let webhookCustomPayload = moreMethod.stringParse(argumentImport("webhook_custompayload"));
	if (typeof webhookCustomPayload !== "boolean") {
		throw new TypeError(`Argument \`webhook_custompayload\` must be type of boolean!`);
	};
	let replaceholderConfig = {
		prefix: argumentImport("replaceholder_prefix"),
		replaceUndefined: moreMethod.stringParse(argumentImport("replaceholder_replaceundefined")),
		suffix: argumentImport("replaceholder_suffix"),
		typeTransform: moreMethod.stringParse(argumentImport("replaceholder_typetransform"))
	};
	if (typeof replaceholderConfig.replaceUndefined === "string") {
		replaceholderConfig.replaceUndefined = replaceholderConfig.replaceUndefined.replace(/^\\/giu, "");
	};
	let replaceholderList = {
		payload: ghactionGitHub.context.payload
	};
	replaceholderList.external = await parseListMatrix("replaceholder_list_external");
	if (advancedDetermine.isJSON(replaceholderList.external, { strictKey: true }) === false) {
		throw new TypeError(`Argument \`replaceholder_list_external\` must be type of string (non-nullable); or JSON, JSONC, or YAML/YML (no illegal namespace character(s))!`);
	};
	if (advancedDetermine.isJSON(replaceholderList.payload, { strictKey: true }) === false) {
		throw new TypeError(`Argument \`replaceholder_list_payload\` must be type of JSON (no illegal namespace character(s))!`);
	};
	let replaceholderService = new moreMethod.Replaceholder(replaceholderList, replaceholderConfig);
	let payload;
	if (webhookCustomPayload === true) {
		payload = await parseListMatrix("payload");
	} else {
		payload = {
			value1: argumentImport("value1"),
			value2: argumentImport("value2"),
			value3: argumentImport("value3")
		};
	};
	if (advancedDetermine.isJSON(payload) === false) {
		throw new TypeError(`Argument \`payload\` must be type of JSON!`);
	};
	ghactionCore.info(`Execute replaceholder service.`);
	webhookEventName = replaceholderService.replace(webhookEventName);
	payload = replaceholderService.replace(payload);
	if (
		advancedDetermine.isString(webhookEventName) !== true ||
		advancedDetermine.isStringSingleLine(webhookEventName) !== true
	) {
		throw new TypeError(`Argument \`webhook_eventname\` must be type of string (non-nullable)!`);
	};
	if (webhookEventName.search(/^[-0-9_a-z]+$/giu) !== 0) {
		throw new SyntaxError(`Argument \`webhook_eventname\`'s value is not match the require pattern!`);
	};
	if (advancedDetermine.isStringLowerCase(webhookEventName) !== true) {
		ghactionCore.warning(`Argument \`webhook_eventname\`'s value is recommended to keep in lower case to prevent issue!`);
	};
	let payloadStringify = JSON.stringify(payload);
	if (dryRun === true) {
		ghactionCore.info(`Webhook Event Name: ${webhookEventName}`);
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
					"User-Agent": ghactionUserAgent
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
		ghactionCore.debug(`Webhook Event Name: ${webhookEventName}`);
		ghactionCore.debug(`Network Request Body (Length: ${payloadStringify.length}): ${payloadStringify}`);
		ghactionCore.info(`Post network request to IFTTT.`);
		let response = await nodeFetch(
			`https://maker.ifttt.com/trigger/${webhookEventName}${(webhookCustomPayload === true) ? "/json" : ""}/with/key/${webhookKey}`,
			{
				body: payloadStringify,
				follow: 5,
				headers: {
					"Content-Type": "application/json",
					"Content-Length": payloadStringify.length,
					"User-Agent": ghactionUserAgent
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
