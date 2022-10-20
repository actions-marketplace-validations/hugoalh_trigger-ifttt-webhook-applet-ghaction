import { build } from "esbuild";
console.log(await build({
	bundle: true,
	charset: "utf8",
	entryPoints: [
		"./src/main.js"
	],
	format: "esm",
	minifyIdentifiers: true,
	minifySyntax: false,
	minifyWhitespace: true,
	outfile: "./dist/main.js",
	platform: "node",
	sourcemap: "linked",
	target: "node16.13",
	treeShaking: true
}));
