import axios from "../app/axios";
import { medicalRecordManagementAPIpath } from "../constant/api";
//create new medical record
export const createNewMedicalRecord = async (data) => {
  try {
    const res = await axios.post(
      medicalRecordManagementAPIpath.createNewMedicalRecord,
      data
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
//search medical record
export const searchMedicalRecords = async (params) => {
  try {
    const res = await axios.get(medicalRecordManagementAPIpath.search, {
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
//get list detail by medical record id
export const getListDetailById = async (params) => {
  try {
    const res = await axios.get(
      medicalRecordManagementAPIpath.getListDetailById,
      {
        params: params,
      }
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
//add new medical record detail
export const addMedicalDetail = async (data) => {
  try {
    const res = await axios.post(
      medicalRecordManagementAPIpath.addMedicalDetail,
      data
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
//edit medical record
export const editMedicalRecord = async (data) => {
  try {
    const res = await axios.put(
      medicalRecordManagementAPIpath.editMedicalRecord,
      data
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
//edit medical details
export const editMedicalDetails = async (data) => {
  try {
    const res = await axios.put(
      medicalRecordManagementAPIpath.editMedicalDetails,
      data
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
