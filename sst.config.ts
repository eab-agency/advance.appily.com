/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from "fs";

export default $config({
  app(input) {

    return {
      name: "advance-appily-com",
      removal: input?.stage === "production" ? "retain" : "remove",
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
    const outputs = {};
    for (const value of readdirSync("./infra/")) {
      const result = await import("./infra/" + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    // new sst.aws.Nextjs("AppilyAdvanceSite");
    return outputs;
  },
});
