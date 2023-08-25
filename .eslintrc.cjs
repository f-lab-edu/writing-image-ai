module.exports = {
  env: {
    browser: true,
    es2024: true,
  },
  plugins: [
    '@typescript-eslint', /*  ypeScript와 ESLint를 함께 사용할 수 있게 하는 플러그인 */
    "import", /*  ES6+ import/export 문법을 사용하면서 발생할 수 있는 문제들을 해결하고, 파일 경로와 import 이름의 유효성을 검사하고, 불필요한 종속성이나 중복된 import를 방지하는 등의 기능을 제공 */
    "eslint-plugin-jsx-a11y", /*  JSX 요소의 접근성 문제를 식별하는데 사용 */
    "jsx-a11y", /*  JSX 요소의 접근성 문제를 식별하는데 사용 */
    "eslint-plugin-promise", /*   JavaScript의 Promise와 관련된 일반적인 문제점을 해결하기 위한 ESLint 플러그인 */
  ],
  extends: [
    'standard-with-typescript',
    "plugin:import/recommended", /*   eslint-plugin-import 플러그인의 권장 규칙을 사용하도록 ESLint에 지시 */
    "plugin:jsx-a11y/recommended", /*  eslint-plugin-jsx-a11y 플러그인의 권장 규칙을 사용하도록 ESLint에 지시 */
    "eslint:recommended", /*  ESLint 팀에서 권장하는 규칙을 사용하도록 ESLint에 지시 */
    "prettier", /*  Prettier와 충돌하는 ESLint 규칙을 끄기 위한 설정 */
    'plugin:prettier/recommended',  /*  Prettier 규칙을 ESLint에 적용하기 위한 설정 */
  ],
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
    project: './tsconfig.json',
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }], // console에서 log는 에러, error는 경고
    "@typescript-eslint/no-non-null-assertion": "off", // null이 아닌 assertion 에러 표시 (off)
    "space-before-function-paren": "off", // 함수 앞 공백이 없으면 에러 (off)
    "@typescript-eslint/space-before-function-paren": "off", // 함수 앞 공백이 없으면 에러 (off)
    "@typescript-eslint/explicit-function-return-type": "off", // return 타입 없어도 된다.
    "@typescript-eslint/no-invalid-void-type": "off", // void 사용을 허용.
    "@typescript-eslint/strict-boolean-expressions": "off", // 비교 타입은 boolean 이외에도 사용 허용. 
    "@typescript-eslint/no-misused-promises": "off", // async/await 보다 then 중심적이어서 사용하지 않음.
    "@typescript-eslint/triple-slash-reference": "off", // 슬래시 세번 쓰면서 하는 참조 방법 ecma에서 권장하는 참조 방법은 아니지만 난 써야겠어요.
    "@typescript-eslint/await-thenable": "off", // 할당할 변수가 없어도 Thenable 하지않다고 해서 지웠습니다.
    "@typescript-eslint/no-confusing-void-expression": "off", // void를 반환하고 싶어서 off 했습니다.
  },
  ignorePatterns: ['.eslintrc.cjs', "vite.config.ts"],
};
