import { createSlice } from "@reduxjs/toolkit";
import {
  addMedicalDetail,
  createNewMedicalRecord,
  editMedicalDetails,
  editMedicalRecord,
  getListDetailById,
  searchMedicalRecords,
} from "../../api/medicalRecordManagement";

const initialState = {
  medicalRecords: [],
  totalPage: 0,
  totalItem: 0,
  medicalRecordDetail: {},
};

export const medicalRecordsManagementSlice = createSlice({
  name: "Medical Records Management",
  initialState,
  reducers: {
    setMedicalRecords: (state, action) => {
      state.medicalRecords = action.payload.listMedicalRecordResponse;
      state.totalPage = action.payload.totalPage;
      state.totalItem = action.payload.totalItem;
    },
    setMedicalRecordDetail: (state, action) => {
      state.medicalRecordDetail = action.payload;
    },
  },
});

export const { setMedicalRecords, setMedicalRecordDetail } =
  medicalRecordsManagementSlice.actions;

export const createNewMedicalRecordsForStaff =
  (data) => async (dispatch, getState) => {
    const response = await createNewMedicalRecord(data);
    return response;
  };

export const getMedicalRecordsBySearch =
  (params) => async (dispatch, getState) => {
    const response = await searchMedicalRecords(params);
    if (response.status === 200) {
      await dispatch(setMedicalRecords(response.data));
      return response.data;
    }
  };

export const getListDetailByMedicalRecordId =
  (params) => async (dispatch, getState) => {
    const response = await getListDetailById(params);
    if (response.status === 200) {
      await dispatch(setMedicalRecordDetail(response.data));
      return response.data;
    }
  };

export const editMedicalRecordsForStaff =
  (data) => async (dispatch, getState) => {
    const response = await editMedicalRecord(data);
    return response;
  };

export const createNewMedicalRecordHappeningForDoctor =
  (data) => async (dispatch, getState) => {
    const response = await addMedicalDetail(data);
    return response;
  };

export const editMedicalRecordHappeningForDoctor =
  (data) => async (dispatch, getState) => {
    const response = await editMedicalDetails(data);
    return response;
  };

export default medicalRecordsManagementSlice.reducer;
