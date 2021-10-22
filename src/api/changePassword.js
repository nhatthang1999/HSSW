import axios from "../app/axios";
import { ChangePasswordAPIPath, ForgetPasswordAPIPath } from "../constant/api";
//change password
export const changePassword = async (data) => {
  try {
    const res = await axios.put(ChangePasswordAPIPath.changePassword, data);
    if (res.status === 200) return { status: 200, data: res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
//request change password when forget
export const requestChangeForgetPassword = async (data) => {
  try {
    const res = await axios.post(ForgetPasswordAPIPath.forgetPassword, data);
    if (res.status === 200) return { status: 200, data: res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
