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
		'./.eslintrc-auto-import.json',
		'plugin:@typescript-eslint/recommended'
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
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'no-unused-vars': 'off',
		'no-undef': 'off',
		'vue/require-default-prop': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'comma-dangle': [
			'error',
			'never'
		],
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always']
	}
}
