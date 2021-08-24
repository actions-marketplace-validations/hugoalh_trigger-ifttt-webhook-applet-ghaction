const childProcess = require("child_process");
const utility = require("util");
const execute = utility.promisify(childProcess.exec);
const executeConfig = {
	cwd: __dirname,
	encoding: "utf8",
	windowsHide: true
};
(async () => {
	let stepSetup = await execute(`node ghaction-nodejs-setup.js`, executeConfig);
	if (stepSetup.stdout.length > 0) {
		console.log(stepSetup.stdout);
	};
	if (stepSetup.stderr.length > 0) {
		throw stepSetup.stderr;
	};
	let stepMain = await execute(`node main.js`, executeConfig);
	if (stepMain.stdout.length > 0) {
		console.log(stepMain.stdout);
	};
	if (stepMain.stderr.length > 0) {
		throw stepMain.stderr;
	};
})().catch((error) => {
	throw error;
});
