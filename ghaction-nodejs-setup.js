const childProcess = require("child_process");
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
	process.exit(1);
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
		process.exit(1);
	});
});