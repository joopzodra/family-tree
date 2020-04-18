/* This config add some rules which can be slow down performance hence should only be checked when committing.
 * See https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md
 */

module.exports = {
  extends: [
    './.eslintrc.js'
  ],
  rules: {
    'import/no-named-as-default': 'error',
    'import/no-cycle': 'error',
    // Is giving incorrect errors, try again with a later version of eslint-plugin-import:
    // 'import/no-unused-modules': 'error',
    'import/no-deprecated': 'error'
  },
};
