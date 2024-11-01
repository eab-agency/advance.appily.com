/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    let domainName;
    if (input?.stage === "production") {
      domainName = "advance.appily.com";
    } else if (input?.stage === "staging") {
      domainName = "qa.advance.appily.com";
    } else {
      domainName = `${input.stage}.qa.advance.appily.com`;
    }

    return {
      name: "advance-appily-com",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      domain: {
        name: domainName,
        dns: false, // Set to true if you want SST to manage DNS records
        cert: "arn:aws:acm:us-east-1:112233445566:certificate/3a958790-8878-4cdc-a396-06d95064cf63"
      }
    };
  },
  async run() {
    new sst.aws.Nextjs("AppilyAdvanceSite");
  },
});
