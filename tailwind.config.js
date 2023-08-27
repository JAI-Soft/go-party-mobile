/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				white: "#FEFEFE",
				gray: "#919191",
				secondary: "#262626",
				"light-black": "#181818",
				teal: {
					100: "#48C5F3",
					200: "#009CC9",
					400: "#0076A0",
					600: "#005179",
					800: "#002F54"
				},
				pink: {
					100: "#E4407E",
					200: "#C31763",
					400: "#A3004A",
					600: "#830032",
					800: "#63001C"
				}
			}
		}
	},
	plugins: []
};
