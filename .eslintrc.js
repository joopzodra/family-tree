module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  ignorePatterns: ['**/*.spec.*'],
  rules: {
    '@typescript-eslint/no-unsafe-member-access': 2,
    '@typescript-eslint/array-type': 2,
    '@typescript-eslint/unbound-method': 0,
  },
};
