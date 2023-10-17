> **NOTICE!** This repo is currently under active development. Please check back periodically for updates.

## Getting Started

### Payload

First you'll need an instance of our [Payload CMS](https://github.com/eab-agency/appily-cms). Take note of your server URL, you'll need this in the next step.

### Next.js App

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
