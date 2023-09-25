import React from 'react';
import { useRequest } from '@/hooks/useRequest';

const SWR = () => {
    const { data, error } = useRequest('/quiz/question', 1);
    // console.log('🚀 ~ file: swr.js:6 ~ SWR ~ data:', data);
    // Handle the error state
    if (error) return <div>Failed to load</div>;
    // Handle the loading state
    if (!data) return <div className="loading">Loading...</div>;
    return <div>SWR</div>;
};

export default SWR;
