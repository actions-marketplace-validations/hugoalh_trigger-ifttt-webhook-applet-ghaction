import { dirname, join as pathJoin } from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { readdir, rename, rm } from "node:fs/promises";
const childProcessExec = promisify(exec);
const outputDirectory = "dist";
const outputFullPath = pathJoin(dirname(fileURLToPath(import.meta.url)), outputDirectory);
console.log(await childProcessExec(`ncc build src/main.js --out ${outputDirectory} --no-cache --no-source-map-register --target es2021`));
for (const outputFile of await readdir(outputFullPath, { withFileTypes: true })) {
	if (outputFile.name === "index.js") {
		rename(pathJoin(outputFullPath, outputFile.name), pathJoin(outputFullPath, "main.js"));
	} else {
		rm(pathJoin(outputFullPath, outputFile.name));
	}
}
