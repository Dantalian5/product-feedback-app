import type {Config} from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		letterSpacing: {
			tightest: '-.2em',
			tighter: '-.25em',
			tight: '-.33em',
			normal: '0',
		},
		extend: {
			colors: {
				softblue: {
					100: '#62bcfa',
					200: '#4661E6',
				},
				grayblue: {
					100: '##647196',
					200: '##3A4374',
					300: '#373F68',
				},
				gray: {
					100: '#F7F8FD',
					200: '#F2F4FF',
				},
				violet: '#AD1FEA',
				orange: '#F49F85',
				white: '#FFFFFF',
			},
		},
	},
	plugins: [],
};
export default config;
