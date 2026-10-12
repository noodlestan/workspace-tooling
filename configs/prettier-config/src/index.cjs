module.exports = {
	useTabs: false,
	printWidth: 100,
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	arrowParens: 'avoid',
	overrides: [
		{
			files: ['*.art', '*.tart'],
			options: {
				parser: 'markdown',
			},
		},
		{
			files: ['*.js', '*.cjs', '*.mjs', '*.ts', '*.mts', '*.tsx'],
			options: {
				useTabs: true,
			},
		},
	],
};
