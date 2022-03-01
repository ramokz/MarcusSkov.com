module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'rules': {

    // Vue
    'vue/require-default-prop': 'off',
    'vue/first-attribute-linebreak': ['error', {
      'singleline': 'ignore',
      'multiline': 'below'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],

    '@typescript-eslint/no-unused-vars': 'off',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-unused-vars': 'off',
    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': ['error', {
      before: false, after: true
    }],
    'comma-style': ['error', 'last'],
    'no-cond-assign': ['error', 'always'],
    'func-call-spacing': ['off', 'never'],
    'key-spacing': ['error', {
      beforeColon: false, afterColon: true
    }],
    'indent': ['error', 2, {
      SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1
    }],
    'no-undef': 'off',
    'curly': ['error'],
    'object-curly-newline': ['error', {
      'ObjectExpression': 'always',
      'ObjectPattern': {
        'multiline': true
      },
      'ImportDeclaration': 'never',
      'ExportDeclaration': {
        'multiline': true, 'minProperties': 3
      }
    }],
    'comma-dangle': ['error', 'never'],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'no-return-await': 'off',
    'space-before-function-paren': ['error', 'never'],
    'padding-line-between-statements': [
      'error',

      {
        blankLine: 'always', prev: ['const', 'let', 'var', 'case', 'class', 'default'], next: '*'
      },
      {
        blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']
      }],

    // Test
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'consistent-return': 'off',
    'complexity': ['off', 11],
    'eqeqeq': ['error', 'smart'],
    'no-alert': 'warn',
    'no-case-declarations': 'error',
    'no-multi-str': 'error',
    'no-with': 'error',
    'no-void': 'error',
    'no-useless-escape': 'off',
    'vars-on-top': 'error',
    'require-await': 'off',
    'no-return-assign': 'off',
    'operator-linebreak': ['error', 'before'],


    // Typescript
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/ban-ts-comment': ['error', {
      'ts-ignore': 'allow-with-description'
    }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none'
      }
    }],
    '@typescript-eslint/type-annotation-spacing': ['error', {
    }],
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports', disallowTypeAnnotations: false
    }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    'no-useless-constructor': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false, classes: false, variables: true
    }],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', 'stroustrup', {
      allowSingleLine: true
    }],
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-namespace': 'off'
  }
}
