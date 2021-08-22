const childProcess = require("child_process"),
	utility = require("util");
const execute = utility.promisify(childProcess.exec);
(async () => {
	let stepSetup = await execute(
		`node setup.js`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	if (stepSetup.stdout.length > 0) {
		console.log(stepSetup.stdout);
	};
	if (stepSetup.stderr.length > 0) {
		throw new Error(stepSetup.stderr);
	};
	let stepMain = await execute(
		`node main.js`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	if (stepMain.stdout.length > 0) {
		console.log(stepMain.stdout);
	};
	if (stepMain.stderr.length > 0) {
		throw new Error(stepMain.stderr);
	};
})().catch((error) => {
	throw error;
});
