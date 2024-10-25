export const tokenService = {
    setToken: (token) => localStorage.setItem('access_token', token),
    getToken: () => localStorage.getItem('access_token'),
    removeToken: () => localStorage.removeItem('access_token'),
    isValid: () => !!localStorage.getItem('access_token'),
    clearAll: () => {
        localStorage.removeItem('access_token');
    }
};