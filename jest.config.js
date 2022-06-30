// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  resolver:'<rootDir>/src/resolver.js',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|scss|png|jpg|svg|ts)$": "jest-transform-stub",
  }
};