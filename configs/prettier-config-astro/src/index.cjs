const base = require('@noodlestan/prettier-config/json');

module.exports = {
	...base,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		...base.overrides,
		{
			files: ['*.astro'],
			options: {
				useTabs: true,
				parser: 'astro',
			},
		},
	],
};
