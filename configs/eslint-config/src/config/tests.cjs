const { OFF } = require('../constants/severity.cjs');

const overrides = [
    {
        files: ['**/*.spec.ts', '**/*.test.ts'],
        rules: {
            'import/no-extraneous-dependencies': [OFF],
        },
    },
];

module.exports = overrides;
