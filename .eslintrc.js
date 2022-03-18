module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {},
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'camelcase': 'off',
    'comma-dangle': 'off',
    'handle-callback-err': 'off',
    'no-unused-vars': 'off',
    'quote-props': 'off',
    'no-extra-semi': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/display-name': 'off',
    'prefer-const': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false, }],
    '@typescript-eslint/no-unused-vars': 'off',
  }
}
