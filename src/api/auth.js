import axios from "axios";
import { setToken, setRefreshToken } from "../app/token";
import { authAPIpath } from "../constant/api";
//authenticate user with username and password
export const authenticate = async (values) => {
  const user = {
    username: values.username,
    password: values.password,
  };
  try {
    const res = await axios.post(authAPIpath.authen, user);
    if (res.status === 200) {
      setToken(res.data.data.token);
      setRefreshToken(res.data.data.refresh_token);
      return { status: 200, ...res.data };
    }
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//refresh token each api request
export const refreshToken = async (refresh_token) => {
  try {
    const res = await axios
      .post(authAPIpath.refresh, refresh_token)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.data.token);
          setRefreshToken(res.data.data.refresh_token);
          return res.data.data.token;
        }
      });
    return res;
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
