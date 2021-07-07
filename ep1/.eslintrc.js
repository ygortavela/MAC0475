module.exports = {
    parser: 'babel-eslint',
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:jest/recommended'],
    parserOptions: {
        ecmaVersion: 2021,
    },
    plugins: ['jest'],
    rules: {},
};
