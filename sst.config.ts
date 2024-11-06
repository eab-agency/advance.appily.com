/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from "fs";

export default $config({
  app(input) {

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
      // domain: {
      //   name: domain,
      //   dns: false, // Set to true if you want SST to manage DNS records
      //   cert: "arn:aws:acm:us-east-1:112233445566:certificate/3a958790-8878-4cdc-a396-06d95064cf63"
      // }
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
