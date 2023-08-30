export const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;

export const pageview = (url) => {
    window.dataLayer.push({
        event: 'pageview',
        page: url,
    });
};
