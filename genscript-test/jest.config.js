const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "../"],
  transform: {
    ...tsJestTransformCfg,
  },
};
