// noinspection JSUnusedGlobalSymbols

import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^tsfy$": path.resolve(__dirname, "src", "core"),
    "^tsfy/fn$": path.resolve(__dirname, "src", "functions"),
    "^tsfy(.*)$": path.join(path.resolve(__dirname, "src"), "$1"),
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
};
