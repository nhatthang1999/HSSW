import axios from "axios";
import { refreshToken } from "../api/auth";
import { signout } from "../reducers/Login";
import { store } from "../store";
import { getToken, getRefreshToken } from "./token";
//config axios
// bỏ comment 3 dòng dưới
axios.defaults.baseURL = "https://quangdz.ddnsgeek.com:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// "proxy": "http://quangdz.ddnsgeek.com:8080/",

const axiosApiInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production'
  //   ? "https://hssw-be-ikeiiik7iq-dt.a.run.app"
  //   : "http://example.com",
  baseURL: "https://quangdz.ddnsgeek.com:8080/", // bỏ comment dongfn ày
});
//config axios interceptor per request (refresh token)
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      const refresh_token = getRefreshToken();
      await refreshToken(refresh_token);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const responseSuccessHandler = (response) => {
  return response;
};

const responseErrorHandler = async (error) => {
  try {
    if (error.response.status === 401) {
      // Add your logic to
      //  1. Redirect user to LOGIN
      //  2. Reset authentication from localstorage/sessionstorage
      await store.dispatch(signout());
      window.location = "/login?redirect=401";
    }
    return Promise.reject(error);
  } catch (error) {
    return Promise.reject(error);
  }
};
//config axios interceptor per response (401 token expired)
axiosApiInstance.interceptors.response.use(
  (response) => responseSuccessHandler(response),
  (error) => responseErrorHandler(error)
);

export default axiosApiInstance;
