import { createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import {
  activeDoctor,
  addNewDoctor,
  editDoctor,
  getAllDoctors,
  getAllFaculty,
  getAllSpecialtyGroupByAcademic,
  getDoctorDetail,
  searchDoctors,
  getProfile,
} from "../../../api/doctorManagement";

const initialState = {
  doctors: [],
  doctorDetail: {},
  faculty: [],
  specialtyGroupByAcademic: [],
};

export const doctorManagementSlice = createSlice({
  name: "Doctor Management",
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setDoctorDetail: (state, action) => {
      state.doctorDetail = action.payload;
    },
    setFaculty: (state, action) => {
      state.faculty = action.payload;
    },
    setSpecialtyGroupByAcademic: (state, action) => {
      state.specialtyGroupByAcademic = action.payload;
    },
  },
});

export const {
  setDoctors,
  setDoctorDetail,
  setFaculty,
  setSpecialty,
  setSpecialtyGroupByAcademic,
} = doctorManagementSlice.actions;

export const getAllDoctorsForAdmin = () => async (dispatch, getState) => {
  const response = await getAllDoctors();
  if (response.status === 200) {
    await dispatch(setDoctors(response.data));
  }
};

export const getAllFacultyForAdmin = () => async (dispatch, getState) => {
  const response = await getAllFaculty();
  if (response.status === 200) {
    await dispatch(setFaculty(response.data));
  }
};

export const getAllSpecialtyGroupByAcademicForAdmin =
  () => async (dispatch, getState) => {
    const response = await getAllSpecialtyGroupByAcademic();
    if (response.status === 200) {
      await dispatch(setSpecialtyGroupByAcademic(response.data));
    }
  };

export const getDetailOfDoctor = (id) => async (dispatch, getState) => {
  const response = await getDoctorDetail(id);
  if (response.status === 200) {
    await dispatch(setDoctorDetail(response.data));
    return response.data;
  }
};

export const addNewDoctorForAdmin = (data) => async (dispatch, getState) => {
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await addNewDoctor(data);
  if (response.status === 200) {
    await notification.success({
      message: "Thêm bác sĩ thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Thêm bác sĩ không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export const editDoctorForAdmin = (data) => async (dispatch, getState) => {
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await editDoctor(data);
  if (response.status === 200) {
    await notification.success({
      message: "Sửa thông tin bác sĩ thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Sửa thông tin bác sĩ không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export const activeDoctorForAdmin = (id) => async (dispatch, getState) => {
  const response = await activeDoctor(id);
  if (response.status === 200) {
    return response;
  }
};

export const getDoctorsBySearch = (params) => async (dispatch, getState) => {
  const response = await searchDoctors(params);
  if (response.status === 200) {
    await dispatch(setDoctors(response.data));
    return response.data;
  }
};

export const getProfileDoctor = () => async (dispatch, getState) => {
  const state = getState();
  const { id } = state.login.user;
  const response = await getProfile(id);
  if (response.status === 200) {
    return response.data;
  }
};

export default doctorManagementSlice.reducer;
