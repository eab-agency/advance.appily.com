/// <reference path="../.sst/platform/config.d.ts" />
export const domain = {
    production: "advance.appily.com",
    dev: "dev.advance.appily.com",
  }[$app.stage] || $app.stage + ".dev.advance.appily.com";