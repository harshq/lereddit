let accessToken: string | null = null;

export const setAccessToken = (t: string) => (accessToken = t);
export const getAccessToken = () => accessToken;
