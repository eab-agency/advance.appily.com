import Head from 'next/head';
import {Quiz} from '@/components';

function QuizHome() {
    return (
        <>
            <Head>
                <title>Health Science Quiz</title>
                <meta name="description" content="Cappex Health Science Quiz" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Quiz />
        </>
    );
}
export default QuizHome;
