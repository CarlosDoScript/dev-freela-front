export const environment = {
    apiUrl: import.meta.env.VITE_API_URL,
    featureFlag: import.meta.env.VITE_FEATURE_FLAG === 'true'
};