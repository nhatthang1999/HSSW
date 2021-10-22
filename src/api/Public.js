import axios from "axios";
import { ForgetPasswordAPIPath, PublicAPIPath } from "../constant/api";
//get news in homepage
export const getTop3NewsInHomePage = async (data) => {
  try {
    const res = await axios.get(PublicAPIPath.getTop3News, { params: data });
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//get doctors in homepage
export const getTop3DoctorInHomePage = async (data) => {
  try {
    const res = await axios.get(PublicAPIPath.getTop3Doctor, { params: data });
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//search doctors in doctor public page
export const searchDoctors = async (data) => {
  try {
    const res = await axios.get(PublicAPIPath.getTop3Doctor, { params: data });
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//search news in news public page
export const searchNewsPublic = async (data) => {
  try {
    const res = await axios.get(PublicAPIPath.getTop3News, { params: data });
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//get news detail
export const getNewsDetail = async (id) => {
  try {
    const res = await axios.get(PublicAPIPath.getNewsDetail + "/" + id);
    if (res.status === 200) return { status: 200, ...res.data };
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
//get all faculty for customer to search in doctor public page
export const getAllFacultyPublic = async () => {
  try {
    const res = await axios.get(PublicAPIPath.getAllFacultyPublic);
    if (res.status === 200) return { status: 200, ...res.data };
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
//get all specialty group by academic for customer to search in doctor public page
export const getAllSpecialtyGroupByAcademic = async () => {
  try {
    const res = await axios.get(PublicAPIPath.getAllGroupByAcademic);
    if (res.status === 200) return { status: 200, ...res.data };
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
//verify account
export const verifyAccount = async (data) => {
  try {
    const res = await axios.post(ForgetPasswordAPIPath.verifyEmail, data);
    if (res.status === 200) return { status: 200, data: res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
//change password
export const changePasswordPublic = async (data) => {
  try {
    const res = await axios.put(ForgetPasswordAPIPath.changePassword, data);
    if (res.status === 200) return { status: 200, data: res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
