import { getAccessToken } from '@/lib/token-utils';

export default async (req, res) => {
    const { id } = req.query;

    const token = await getAccessToken();

    const response = await fetch(
        `https://go.cappexhealth.com/api/forms/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    // parse the response as json
    const data = await response.json();
    // return the response as json
    res.status(200).json(data);
};
