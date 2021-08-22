const childProcess = require("child_process");
const utility = require("util");
const execute = utility.promisify(childProcess.exec);
let nodejsVersion = process.versions.node;
let [major, minor] = nodejsVersion.split(".");
major = Number(major);
minor = Number(minor);
if (
	major < 14 ||
	(major === 14 && minor < 15)
) {
	throw new Error(`This action cannot execute on NodeJS which lower than v14.15.0!\nCurrent NodeJS Version: ${nodejsVersion}`);
};
(async () => {
	let stepVerifyRegistry = await execute(
		`npm config get registry`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	let registry = stepVerifyRegistry.stdout.trim();
	if (registry !== "https://registry.npmjs.org/") {
		throw new Error(`This action cannot execute on NPM with non-NPM registry!\nCurrent NPM Registry: ${registry}`);
	};
	if (stepVerifyRegistry.stderr.length > 0) {
		throw new Error(stepVerifyRegistry.stderr);
	};
	let stepInstall = await execute(
		`npm install`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	if (stepInstall.stdout.length > 0) {
		console.log(stepInstall.stdout);
	};
	if (stepInstall.stderr.length > 0) {
		throw new Error(stepInstall.stderr);
	};
})().catch((error) => {
	throw error;
});
