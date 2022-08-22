module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double"],
    "no-underscore-dangle": ["error", { allow: ["true"] }],
    // eslint-disable-next-line no-dupe-keys
    "no-underscore-dangle": "off",
  },
};
