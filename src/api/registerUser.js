import axios from "axios";
import { RegisterAPIPath } from "../constant/api";
//register user (customer)
export const registerUser = async (data) => {
  try {
    const res = await axios.post(RegisterAPIPath.register, data);
    if (res.status === 200) return { status: 200, data: res.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
//verify email (customer)
export const verifyEmail = async (data) => {
  try {
    const res = await axios.post(RegisterAPIPath.verifyEmail, data);
    if (res.status === 200) return { status: 200, data: res.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
