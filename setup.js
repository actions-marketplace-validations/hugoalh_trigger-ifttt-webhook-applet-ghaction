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
