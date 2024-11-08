export const rootDomain = "appily.link"

export const domain = {
    production: rootDomain,
    dev: `dev.${rootDomain}`,
  }[$app.stage] || $app.stage + `.dev.${rootDomain}`
