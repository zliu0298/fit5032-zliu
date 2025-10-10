module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2022,
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    "require-jsdoc": "off",
    // ✅ 放宽单行长度限制（原来是 80）
    "max-len": ["error", {code: 120, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true}],
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
