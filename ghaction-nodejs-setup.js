const childProcess = require("child_process");
/*
const utility = require("util");
const execute = utility.promisify(childProcess.exec);
*/
const executeConfig = {
	cwd: __dirname,
	encoding: "utf8",
	windowsHide: true
};
let nodejsVersion = process.versions.node;
let [major, minor] = nodejsVersion.split(".");
major = Number(major);
minor = Number(minor);
if (
	major < 14 ||
	(major === 14 && minor < 15)
) {
	throw new Error(`This action cannot execute with NodeJS which version is lower than v14.15.0!\nCurrent NodeJS Version: v${nodejsVersion}`);
};
/*
(async () => {
	let stepVerifyRegistry = await execute(`npm config get registry`, executeConfig);
	let registry = stepVerifyRegistry.stdout.trim();
	if (registry !== "https://registry.npmjs.org/") {
		throw new Error(`This action cannot execute with NPM which has non-NPM registry!\nCurrent NPM Registry: ${registry}`);
	};
	if (stepVerifyRegistry.stderr.length > 0) {
		console.error(stepVerifyRegistry.stderr);
	};
	let stepInstall = await execute(`npm install`, executeConfig);
	if (stepInstall.stdout.length > 0) {
		console.log(stepInstall.stdout);
	};
	if (stepInstall.stderr.length > 0) {
		console.error(stepInstall.stderr);
	};
})().catch((error) => {
	console.error(error);
	process.exit(322);
});
*/
new Promise((resolve, reject) => {
	childProcess.exec(
		`npm config get registry`,
		executeConfig,
		(error, stdout, stderr) => {
			let registry = stdout.trim();
			if (registry !== "https://registry.npmjs.org/") {
				throw new Error(`This action cannot execute with NPM which has non-NPM registry!\nCurrent NPM Registry: ${registry}`);
			};
			if (stderr.length > 0) {
				console.error(stderr);
			};
			if (typeof error !== "undefined" && error !== null) {
				reject(error);
			} else {
				resolve();
			};
		}
	);
}).catch((error) => {
	console.error(error);
	process.exit(7813);
}).then(() => {
	new Promise((resolve, reject) => {
		childProcess.exec(
			`npm install`,
			executeConfig,
			(error, stdout, stderr) => {
				if (stdout.length > 0) {
					console.log(stdout);
				};
				if (stderr.length > 0) {
					console.error(stderr);
				};
				if (typeof error !== "undefined" && error !== null) {
					reject(error);
				} else {
					resolve();
				};
			}
		);
	}).catch((error) => {
		console.error(error);
		process.exit(7814);
	});
});