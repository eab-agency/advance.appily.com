/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GTM_ID } from '@/lib/gtm';
import { GTAG_ID } from '@/lib/gtag';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    async
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
                />
                <Script
                    id="GA-config-code"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || []; function gtag()
                {dataLayer.push(arguments)}
                gtag('js', new Date()); gtag('config', '${GTAG_ID}');
                `,
                    }}
                />
            </Head>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
