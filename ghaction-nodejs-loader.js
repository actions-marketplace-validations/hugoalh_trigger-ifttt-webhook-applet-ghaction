const childProcess = require("child_process");
const executeConfig = {
	cwd: __dirname,
	encoding: "utf8",
	windowsHide: true
};
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
	process.exit(1);
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
		process.exit(1);
	});
});
