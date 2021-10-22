import axios from "axios";
import { setToken, getToken } from "../app/token";
import { loginAPIpath } from "../constant/api";

export const login = async (values) => {
  const user = {
    username: values.username,
    password: values.password,
  };
  const res = await axios
    .post(loginAPIpath.login, user)
    .then((res) => {
      if (res.status === 200) {
        setToken(res.data.data.token);
        return res.data.data.token;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
//get role to authorization
export const getRole = async (values) => {
  const { username } = values;
  const token = getToken();

  try {
    const res = await axios.get(loginAPIpath.getRole + `/` + username, {
      headers: {
        Authorization: token,
      },
    });
    if (res.status === 200) {
      const { id, role, user_id } = res.data.data;
      return { id, role, user_id };
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
