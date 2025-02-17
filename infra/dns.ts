export const rootDomain = "advance.appily.com"
export const devDomain = "advance.appily.click"

export const domain = {
    production: rootDomain,
    dev: devDomain,
  }[$app.stage] || `${$app.stage}.${devDomain}`

export const outputs = {
  www: `https://${domain}`
}