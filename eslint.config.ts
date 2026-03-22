import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import i18nextPlugin from 'eslint-plugin-i18next';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { readFileSync } from 'node:fs';
import tseslint from 'typescript-eslint';

const prettierOptions = JSON.parse(
	readFileSync(new URL('./.prettierrc', import.meta.url), 'utf-8'),
);

export default defineConfig(
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/coverage/**',
			'**/*.js',
			'**/*.mjs',
			'**/*.cjs',
			'**/*.config.ts',
			'**/.husky/**',
			'**/playwright-report/**',
			'**/test-results/**',
			'**/.vite/**',
			'**/.idea/**',
			'**/.vscode/**',
			'**/*.tsbuildinfo',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			react: fixupPluginRules(reactPlugin),
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'react-compiler': reactCompiler,
			'unused-imports': unusedImports,
			import: importPlugin,
			i18next: i18nextPlugin,
			prettier: prettierPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		rules: {
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'prettier/prettier': ['error', prettierOptions],
			'linebreak-style': 'off',
			'eol-last': ['error', 'always'],
			'max-len': [
				'error',
				{
					code: 100,
					tabWidth: 2,
					ignoreRegExpLiterals: true,
					ignoreStrings: true,
					ignoreUrls: true,
					ignoreTemplateLiterals: true,
				},
			],
			'no-trailing-spaces': ['error'],
			'prefer-const': ['error'],
			'no-var': 'error',
			quotes: ['error', 'single'],
			'space-in-parens': ['error', 'never'],
			'arrow-parens': ['error', 'always'],
			'no-magic-numbers': [
				'warn',
				{
					ignore: [-1, 0, 1],
					ignoreArrayIndexes: true,
					enforceConst: true,
				},
			],
			eqeqeq: 'error',
			yoda: 'error',
			'brace-style': ['error', '1tbs'],
			'array-bracket-spacing': ['error', 'never'],
			'comma-dangle': ['error', 'always-multiline'],
			semi: 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					vars: 'local',
					args: 'after-used',
					ignoreRestSiblings: true,
					argsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'enumMember',
					format: ['UPPER_CASE'],
				},
			],
			'@typescript-eslint/array-type': ['error', { default: 'generic' }],
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/prefer-includes': 'error',
			'@typescript-eslint/promise-function-async': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-use-before-define': [
				'error',
				{
					functions: false,
					variables: false,
					enums: false,
					typedefs: false,
					ignoreTypeReferences: false,
				},
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-empty-interface': 'error',
			'@typescript-eslint/no-empty-function': 'error',
			'@typescript-eslint/no-inferrable-types': 'off',
			'no-mixed-spaces-and-tabs': 'error',
			'padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: '*',
					next: [
						'multiline-expression',
						'return',
						'multiline-const',
						'multiline-block-like',
						'switch',
						'try',
						'while',
						'iife',
						'break',
						'case',
						'default',
						'block',
						'class',
						'for',
						'function',
						'if',
					],
				},
				{
					blankLine: 'always',
					prev: [
						'multiline-expression',
						'return',
						'multiline-const',
						'multiline-block-like',
						'switch',
						'try',
						'while',
						'iife',
						'break',
						'case',
						'default',
						'block',
						'class',
						'for',
						'function',
						'if',
					],
					next: '*',
				},
			],
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
			'object-shorthand': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'no-eq-null': 'error',
			'unused-imports/no-unused-imports': 'error',
			'import/no-duplicates': ['error', { considerQueryString: true }],
			'import/order': 'off',
			curly: ['error', 'all'],

			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
			'react/jsx-closing-bracket-location': 'error',
			'react/jsx-one-expression-per-line': 'off',
			'react/display-name': 'error',
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react/jsx-key': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',
			'react-compiler/react-compiler': 'error',
			'i18next/no-literal-string': 'off',
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					ts: 'never',
					tsx: 'never',
					js: 'never',
					jsx: 'never',
				},
			],
		},
	},
	{
		files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/*.e2e.{ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'i18next/no-literal-string': 'off',
		},
	},
);
