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
/*
(async () => {
	let stepSetup = await execute(`node ghaction-nodejs-setup.js`, executeConfig);
	if (stepSetup.stdout.length > 0) {
		console.log(stepSetup.stdout);
	};
	if (stepSetup.stderr.length > 0) {
		console.error(stepSetup.stderr);
	};
	let stepMain = await execute(`node main.js`, executeConfig);
	if (stepMain.stdout.length > 0) {
		console.log(stepMain.stdout);
	};
	if (stepMain.stderr.length > 0) {
		console.error(stepMain.stderr);
	};
})().catch((error) => {
	console.error(error);
	process.exit(321);
});
*/
new Promise((resolve, reject) => {
	childProcess.exec(
		`node ghaction-nodejs-setup.js`,
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
	process.exit(7811);
}).then(() => {
	new Promise((resolve, reject) => {
		childProcess.exec(
			`node main.js`,
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
		process.exit(7812);
	});
});
