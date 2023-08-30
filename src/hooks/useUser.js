import useSWR from 'swr';

export default function useUser() {
    const { data: user } = useSWR('/api/user');

    return { user };
}
