import axios from "../app/axios";
import { DoctorManagementAPIpath } from "../constant/api";

export const getAllDoctors = async () => {
  try {
    const res = await axios.get(DoctorManagementAPIpath.getAll);
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
//search doctors
export const searchDoctors = async (params) => {
  try {
    const res = await axios.get(DoctorManagementAPIpath.searchDoctor, {
      params: params,
    });
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
//get all faculty
export const getAllFaculty = async () => {
  try {
    const res = await axios.get(DoctorManagementAPIpath.getAllFaculty);
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
//get all specialty group by academic
export const getAllSpecialtyGroupByAcademic = async () => {
  try {
    const res = await axios.get(DoctorManagementAPIpath.getAllGroupByAcademic);
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
//get doctor detail
export const getDoctorDetail = async (id) => {
  try {
    const res = await axios.get(
      DoctorManagementAPIpath.getDoctorDetail + "/" + id
    );
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
//add new doctor
export const addNewDoctor = async (data) => {
  try {
    const res = await axios.post(DoctorManagementAPIpath.addNewDoctor, data);
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
//edit doctor information
export const editDoctor = async (data) => {
  try {
    const res = await axios.post(DoctorManagementAPIpath.editDoctor, data);

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
//active/deactive doctor
export const activeDoctor = async (id) => {
  try {
    const res = await axios.delete(DoctorManagementAPIpath.activeDoctor, {
      params: {
        doctorId: id,
      },
    });
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
//get profile of user(doctor)
export const getProfile = async (id) => {
  try {
    const res = await axios.get(
      DoctorManagementAPIpath.getDoctorDetail + `/` + id
    );
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
