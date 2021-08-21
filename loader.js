const childProcess = require("child_process"),
	utility = require("util");
const execute = utility.promisify(childProcess.exec);
(async () => {
	let setup = await execute(
		`node setup.js`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	if (setup.stdout.length > 0) {
		console.log(setup.stdout);
	};
	if (setup.stderr.length > 0) {
		console.error(setup.stderr);
	};
	let main = await execute(
		`node main.js`,
		{
			cwd: __dirname,
			encoding: "utf8",
			windowsHide: true
		}
	);
	if (main.stdout.length > 0) {
		console.log(main.stdout);
	};
	if (main.stderr.length > 0) {
		console.error(main.stderr);
	};
})().catch((error) => {
	throw error;
});
