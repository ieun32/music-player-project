module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:css-modules/recommended",
    "plugin:jsdoc/recommended-error",
    "plugin:json/recommended-legacy",
    "plugin:fp/recommended",
  ],
  // 운영체제 별로 다른 개행 문자 자동 인식
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "css-modules/no-unused-class": [2, { camelCase: true }],
    "css-modules/no-undef-class": [2, { camelCase: true }],
  },
  plugins: ["prettier", "css-modules", "jsdoc", "json", "fp"],
  // ESM 사용 가능하도록
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // config 파일은 esling, prettier 검사 통과
  ignorePatterns: ["dist"],
};
