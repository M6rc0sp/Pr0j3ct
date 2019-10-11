export const TOKEN_KEY = "@m6rc0sp";
export const isAuthenticated = () => document.cookie.indexOf("TOKEN_KEY") !== -1;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  let n = 1000 * 60 * 60 * 24;
  let data = new Date(new Date().getTime() + n);
  data = data.toUTCString();
  console.log("olá", data)
  document.cookie = 'TOKEN_KEY=' + token + '; expires=' + data + ';';
};
export const logout = () => {
  document.cookie = 'TOKEN_KEY=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  window.location.reload();
};