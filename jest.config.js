// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
};
