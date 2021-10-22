import axios from "../app/axios";
import { StaffManagementAPIpath } from "../constant/api";
//search staff
export const searchStaff = async (params) => {
  try {
    const res = await axios.get(StaffManagementAPIpath.searchStaff, {
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
//get staff detail
export const getStaffDetail = async (id) => {
  try {
    const res = await axios.get(
      StaffManagementAPIpath.getStaffDetail + "/" + id
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
//add new staff
export const addNewStaff = async (data) => {
  try {
    const res = await axios.post(StaffManagementAPIpath.addNewStaff, data);
    if (res.status === 200) return { status: 200, data: res.data };
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
//edit staff
export const editStaff = async (data) => {
  try {
    const res = await axios.put(StaffManagementAPIpath.editStaff, data);
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
//actice/deactive staff
export const activeStaff = async (staffId) => {
  try {
    const res = await axios.delete(StaffManagementAPIpath.activeStaff, {
      params: {
        staffId: staffId,
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
