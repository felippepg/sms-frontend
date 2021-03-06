import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = 'Authenticate'
export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    try {
        jwtDecode(token)
        return true
    } catch (error) {
        return false
    }
}
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
}
// export const TOKEN_KEY = "@airbnb-Token";
// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const getToken = () => localStorage.getItem(TOKEN_KEY);
// export const login = token => {
//   localStorage.setItem(TOKEN_KEY, token);
// };
// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };