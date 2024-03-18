module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:playwright/playwright-test', 'eslint:recommended'],
  plugins: ['prettier', 'playwright'],
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
        useTabs: false,
        tabWidth: 2
      }
    ],
    'playwright/no-conditional-in-test': 'off',
    'playwright/expect-expect': 'off',
    'playwright/no-focused-test': 'error',
    'playwright/require-soft-assertions': 'warn',
    'no-console': 'off',
    'no-useless-escape': 'off',
    'no-empty-pattern': 'off',
    'no-eval': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'warn',
    'no-return-assign': 'warn',
    'comma-dangle': ['error', 'never'],
    strict: ['error', 'global'],
    'func-style': ['warn', 'expression'],
    'no-new-func': 'error',
    'no-param-reassign': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-invalid-this': 'error',
    'prefer-destructuring': ['warn', { array: true, object: true }, { enforceForRenamedProperties: true }],
    'no-implied-eval': 'error',
    eqeqeq: 'error',
    'no-with': 'error',
    'func-call-spacing': ['error', 'never'],
    'max-len': ['off', { code: 250, ignoreComments: true }],
    'new-cap': ['error', { newIsCap: true }],
    'new-parens': 'error',
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-var': 'warn',
    'no-unused-vars': ['warn', { vars: 'local' }],
    'import/no-unresolved': 'off', // k6 is actually golang, can't really import it
    'no-restricted-globals': 'off', // required by k6, e.g. "init" context
    'import/extensions': 'off', // .js ending is ok
    'no-prototype-builtins': 'off'
  },
  globals: { __ENV: 'readonly' } // k6 rule for envs
}
