//set token to local storage
export const setToken = (token) => {
  localStorage.setItem("token", "Bearer " + token);
};

//set refresh token to local storage
export const setRefreshToken = (token) => {
  localStorage.setItem("refresh_token", token);
};

//get token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

//get refresh token from local storage
export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("refresh_token");
//   localStorage.removeItem("persist:root");
// };
