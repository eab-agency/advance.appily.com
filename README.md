## Getting Started

Edit

### Payload

First you'll need an instance of our [Payload CMS](https://github.com/eab-agency/appily-cms). Take note of your server URL, you'll need this in the next step.

### Next.js App Setups

First, get your environment setup:

1. First copy the example `.env` file as your own:

   ```bash
     cp .env.example .env
   ```

2. Then open the `.env` file and put in appropriate values:

   ```bash
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     NEXT_PUBLIC_CMS_URL=http://localhost:8000
     NEXT_PUBLIC_IS_LIVE=
     SECRET_COOKIE_PASSWORD=make-it-a-random-string
     ACS_PUBLIC_KEY=get-from-bob
     ACS_PRIVATE_KEY=get-from-bob
   ```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying the documents within your CMS.

### Deployment

QA CMS: [https://qa-appily-cms.payloadcms.app/admin/](https://qa-appily-cms.payloadcms.app/admin/)

Branch that biulds to QA CMS: `UAT-dev-url-to-qa-cms`

Public facing URL that accesses above CMS: [https://dev.advance.appily.com/](https://dev.advance.appily.com/)
