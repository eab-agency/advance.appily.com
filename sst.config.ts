/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from "fs";

export default $config({
  app(input) {
    // Configure the application
    return {
      name: "advance-appily-com",
      // removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: process.env.GITHUB_ACTIONS
          ? undefined
          : input.stage === "production"
            ? "appily-production"
            : "appily-dev",
        }
      }
    };
  },
  async run() {
    // Load outputs from the infra directory
    const outputs = {};
    for (const value of readdirSync("./infra/")) {
      const result = await import("./infra/" + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
