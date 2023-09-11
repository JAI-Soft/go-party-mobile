module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// Required for expo-router
			"expo-router/babel",
			"nativewind/babel",
			[
				"module-resolver",
				{
					alias: {
						"@Components": "./src/components",
						"@Services": "./src/services",
						"@Context": "./src/context",
						"@Hooks": "./src/hooks",
						"@Stores": "./src/stores"
					},
					extensions: [".js", ".jsx", ".ts", ".tsx"]
				}
			]
		]
	};
};
