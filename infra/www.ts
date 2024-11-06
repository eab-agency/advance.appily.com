/// <reference path="../.sst/platform/config.d.ts" />

export const www = new sst.aws.Nextjs("AppilyAdvanceSite");

export const outputs = {
  www: www.url,
};