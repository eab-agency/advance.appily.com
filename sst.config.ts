/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    let domain;
    if (input?.stage === "production") {
      domain = "advance.appily.com";
    } else if (input?.stage === "qa") {
      domain = "qa.advance.appily.com";
    } else {
      domain = `${input.stage}.qa.advance.appily.com`;
    }


    return {
      name: "advance-appily-com",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      domain,
    };
  },
  async run() {
    new sst.aws.Nextjs("AppilyAdvanceSite");
  },
});
