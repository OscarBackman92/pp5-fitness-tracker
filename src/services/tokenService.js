const tokenService = {
    setToken: (token) => localStorage.setItem('access_token', token),
    getToken: () => localStorage.getItem('access_token'),
    removeToken: () => localStorage.removeItem('access_token'),
    isValid: () => !!localStorage.getItem('access_token'),
    setUsername: (username) => localStorage.setItem('username', username),
    getUsername: () => localStorage.getItem('username'),
    removeUsername: () => localStorage.removeItem('username'),
    clearAll: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
    }
};

export { tokenService }