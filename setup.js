const childProcess = require("child_process"),
	utility = require("util");
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
	let install = await execute(
		`npm install`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	if (install.stdout.length > 0) {
		console.log(install.stdout);
	};
	if (install.stderr.length > 0) {
		console.error(install.stderr);
	};
})().catch((error) => {
	throw error;
});
