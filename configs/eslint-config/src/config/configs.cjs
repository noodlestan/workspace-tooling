const { OFF } = require('../constants/severity.cjs');

const overrides = [
    {
        files: ['**/*.config.js', '**/config/**/*.c?js'],
        rules: {
            'global-require': OFF,
            'import/no-dynamic-require': OFF,
            'import/no-extraneous-dependencies': OFF,
            'security/detect-non-literal-require': OFF,
        },
    },
];

module.exports = overrides;
