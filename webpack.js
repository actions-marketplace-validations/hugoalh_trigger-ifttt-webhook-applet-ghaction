import { dirname, join as pathJoin } from "node:path";
import { fileURLToPath } from "node:url";
import TerserPlugin from "terser-webpack-plugin";
const webpackConfig = {
	entry: "./src/main.js",
	experiments: {
		topLevelAwait: true
	},
	mode: "production",
	optimization: {
		minimize: false,
		minimizer: [new TerserPlugin({ extractComments: false })]
	},
	output: {
		asyncChunks: false,
		clean: false,
		filename: "main.js",
		iife: false,
		path: pathJoin(dirname(fileURLToPath(import.meta.url)), "dist")
	},
	target: "node16.13"
};
export default webpackConfig;
