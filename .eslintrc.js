module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        'no-var': 'error',
        'prefer-const': 'warn'
    },
    globals: {
        localStorage: 'readonly',
        document: 'readonly',
        window: 'readonly'
    }
};