import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!ky/.*)"],
};

export default config;
