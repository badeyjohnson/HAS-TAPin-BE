module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  rules: {
    strict: 1,
    'nonblock-statement-body-position': 0,
    'operator-linebreak': 0,
    indent: 0,
    curly: 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'ignore',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'no-restricted-globals': 1,
    'consistent-return': 0,
    camelcase: 0,
    'func-names': 0,
    'arrow-body-style': 0,
    'no-param-reassign': 0,
    'prefer-promise-reject-errors': 0,
    'space-before-function-paren': 0,
    'arrow-parens': 0,
    'no-unused-vars': [
      1,
      {
        argsIgnorePattern: 'Promise|res|next|^err'
      }
    ],
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ]
  }
};
