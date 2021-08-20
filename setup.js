let nodejsVersion = process.versions.node;
let [major, minor] = nodejsVersion.split(".");
major = Number(major);
minor = Number(minor);
if (
	major < 14 ||
	(major === 14 && minor < 15)
) {
	throw new Error(`This action cannot execute on NodeJS which lower than v14.15.0 (Current NodeJS Version: ${nodejsVersion})!`);
};
const childProcess = require("child_process");
childProcess.exec(
	`npm install`,
	{
		cwd: __dirname,
		encoding: "utf8",
		windowsHide: true
	},
	(error, stdout, stderr) => {
		if (error) {
			throw error;
		};
		if (stdout.length > 0) {
			console.log(stdout);
		};
		if (stderr.length > 0) {
			console.error(stderr);
		};
	}
);
