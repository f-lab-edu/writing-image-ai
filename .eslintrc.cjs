module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // 여기에 추가합니다.
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }], // console에서 log는 에러, error는 경고
    "semi": "off", // 세미콜론 붙이면 에러 (err)
    "@typescript-eslint/semi": "off", // 세미콜론 붙이면 에러 (err)
    "@typescript-eslint/no-non-null-assertion": "off", // null이 아닌 assertion 에러 표시 (off)
    "space-before-function-paren": "off", // 함수 앞 공백이 없으면 에러 (off)
    "@typescript-eslint/space-before-function-paren": "off" // 함수 앞 공백이 없으면 에러 (off)
  },
  ignorePatterns: ['.eslintrc.cjs'],
};
