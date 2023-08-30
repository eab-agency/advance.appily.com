import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';

export default withIronSessionApiRoute(formRoute, sessionOptions);

async function formRoute(req, res) {
    try {
        if (req.method === 'POST') {
            const { email, fname, lname, state } = await req.body;

            const user = { email, fname, lname, state };
            req.session.user = user;
            await req.session.save();
            res.redirect(302, '/');
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
