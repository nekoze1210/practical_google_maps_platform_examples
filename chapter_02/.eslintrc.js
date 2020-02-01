module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: '2018',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    'semi': [
      2, 'never'
    ],
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'import/newline-after-import': ['error'],
    'prettier/prettier': ['error',
      {
        'semi': false,
        'singleQuote': true
      }
    ]
  }
}
