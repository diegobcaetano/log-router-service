import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ...eslint.configs.recommended,
    files: ['src/**/*.ts'],
  },
  ...tseslint.configs.recommended.map(conf => ({
    ...conf,
    files: ['src/**/*.ts'],
  })),
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
