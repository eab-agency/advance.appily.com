import axios from 'axios';
import Cors from 'cors';

const allowedOrigins = [
    'http://127.0.0.1:5173',
    'http://127.0.0.1:*',
    'http://localhost:*',
    'https://alr.netlify.app',
];

const cors = Cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error());
        }
    },
});

const runCorsMiddleware = (req, res) =>
    new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });

export default async function corsHandler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow CORS from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // allow certain methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { formId } = req.query;

    try {
        if (!formId) {
            res.status(400).json({
                message: '⚠️ Missing required body params',
            });
            return;
        }

        await runCorsMiddleware(req, res);

        const endpoint = `https://go.cappexhealth.com/form/submit?formId=${formId}`;
        const { data } = await axios.post(endpoint, req.body);

        res.status(200).json(data);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: '🚫 Request error', error });
    }
}
