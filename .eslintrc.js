/* Without eslint-plugin-import and the import/extensions rule, eslint complains about missing .ts extension in import statements.
 * Other import rules are configured according to https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md
 *
 * The folder 'docs/** ... has been added to the ignorePatterns otherwise eslint complains that its files should be added to the files included in the project,
 * although this folder is not in 'include' in  tsconfig.json. (Maybe it is referenced by rollup.config.js.)
 *
 * Note: because we're using eslint-plugin-prettier here, in package.json the command "prettier --write" could be removed from the lint-staged command.
 * With eslint-plugin-prettier and the 'eslint --fix' command everything 'prettier --write' should do, is done already.
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    '@open-wc/eslint-config',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['**/*.spec.*', 'docs/**/*.*'],
  rules: {
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/indent': 'off',
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'import/no-unused-modules': 'off',
    'import/no-deprecated': 'off'
  },
};
