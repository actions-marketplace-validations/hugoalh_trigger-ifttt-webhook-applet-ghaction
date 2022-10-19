import rollupCommonJS from "@rollup/plugin-commonjs";
import rollupNodeResolve from "@rollup/plugin-node-resolve";
const rollupConfig = {
	cache: false,
	input: "./src/main.js",
	output: {
		compact: true,
		dir: "./dist",
		dynamicImportInCjs: false,
		format: "es",
		freeze: false,
		generatedCode: "es2015",
		sourcemap: true
	},
	plugins: [
		rollupCommonJS(),
		rollupNodeResolve()
	],
	treeshake: "safest"
};
export default rollupConfig;
