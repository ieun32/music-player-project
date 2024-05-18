module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  // 운영체제 별로 다른 개행 문자 자동 인식
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  // ESM 사용 가능하도록
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // config 파일은 esling, prettier 검사 통과
  ignorePatterns: ["dist"],
};
