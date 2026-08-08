const { OFF } = require('../constants/severity.cjs');

const overrides = [
    {
        files: ['**/*.mdx'],
        extends: ['plugin:mdx/recommended'],
        rules: {
            'max-len': [OFF],
            'no-unused-vars': [OFF], // usage of imported components is not correctly tracked
            'no-useless-escape': [OFF], // sometimes \_\_\_ is necessary
            'import/no-extraneous-dependencies': [OFF],
        },
    },
];

module.exports = overrides;
