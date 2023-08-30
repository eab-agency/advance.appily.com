const tokenEndpoint = 'https://go.cappexhealth.com/oauth/v2/token';
const clientId = process.env.ACS_PUBLIC_KEY;
const clientSecret = process.env.ACS_PRIVATE_KEY;
let accessToken = null;
let tokenExpiration = 0;

async function fetchAccessToken() {
    const tokenResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`
            ).toString('base64')}`,
        },
        body: `grant_type=client_credentials`,
    });

    const tokenData = await tokenResponse.json();
    accessToken = tokenData.access_token;
    tokenExpiration = Date.now() + tokenData.expires_in * 1000;
}

// fetch initial access token
fetchAccessToken();

// export function to get access token
export async function getAccessToken() {
    if (!accessToken || Date.now() >= tokenExpiration) {
        await fetchAccessToken();
    }
    return accessToken;
}
