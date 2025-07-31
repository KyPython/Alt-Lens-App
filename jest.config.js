/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@react-navigation/.*)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
};
