/// <reference path="../.sst/platform/config.d.ts" />
import { domain, rootDomain } from "./dns";

export const www = new sst.aws.Nextjs("AppilyAdvanceSite", {
    domain: {
      name: domain,
      redirects: $app.stage === 'production' ? [`www.${rootDomain}`] : [],
    },
});
