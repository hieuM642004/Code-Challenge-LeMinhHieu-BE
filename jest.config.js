/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
