import useSwr from 'swr';

const baseUrl = '/api';

export const useRequest = (path, name) => {
    if (!path) {
        throw new Error('Path is required');
    }

    const nameString = name != null ? name.toString() : '';
    const url = `${baseUrl}${path}/${nameString}`;

    const { data, error } = useSwr(url);

    return { data, error };
};
