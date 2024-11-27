/// <reference path="../.sst/platform/config.d.ts" />
import { domain } from "./dns";

export const www = new sst.aws.Nextjs("AppilyAdvanceSite", {
    domain: {
      name: domain,
      // redirects: $app.stage === 'production' ? [`www.${rootDomain}`] : [],
      // set dns to false if $app.stage === 'production'
      // dns: $app.stage === 'production' ? false : undefined,
      // cert: $app.stage === 'production' ? 'arn:aws:acm:us-east-1:631709423707:certificate/de28c699-14b0-42e8-a6e6-a452b868ca8e' : undefined
    },
});