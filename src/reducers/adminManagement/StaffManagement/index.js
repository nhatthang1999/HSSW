import { createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import {
  activeStaff,
  addNewStaff,
  editStaff,
  // getAllStaff,
  //   getStaffByPaging,
  getStaffDetail,
  searchStaff,
} from "../../../api/staffManagement";

const initialState = {
  staff: [],
  staffDetail: {},
};

export const staffManagementSlice = createSlice({
  name: "Staff Management",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setStaffDetail: (state, action) => {
      state.staffDetail = action.payload;
    },
  },
});

export const { setStaff, setStaffDetail } = staffManagementSlice.actions;

// export const getStaffByPagingForAdmin =
//   (params) => async (dispatch, getState) => {
//     const response = await getStaffByPaging(params);
//     if (response !== "") {
//       await dispatch(setStaff(response.data));
//     }
//   };

export const getStaffBySearch = (params) => async (dispatch, getState) => {
  const response = await searchStaff(params);
  if (response.status === 200) {
    await dispatch(setStaff(response.data));
    return response.data;
  }
};

// export const getAllStaffForAdmin = () => async (dispatch, getState) => {
//   const response = await getAllStaff();
//   if (response !== "") {
//     await dispatch(setStaff(response.data));
//     return response.data;
//   }
// };
export const getStaffDetailForAdmin = (id) => async (dispatch, getState) => {
  const response = await getStaffDetail(id);
  if (response.status === 200) {
    await dispatch(setStaffDetail(response.data));
    return response.data;
  }
};

export const addNewStaffForAdmin = (data) => async (dispatch, getState) => {
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await addNewStaff(data);
  if (response.status === 200) {
    await notification.success({
      message: "Thêm nhân viên thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Thêm nhân viên không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export const editStaffForAdmin = (data) => async (dispatch, getState) => {
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await editStaff(data);
  if (response.status === 200) {
    await notification.success({
      message: "Sửa Thông tin cá nhân thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Sửa Thông tin cá nhân không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export const activeStaffForAdmin = (id) => async (dispatch, getState) => {
  const response = await activeStaff(id);
  if (response.status === 200) {
    return response;
  }
};

export default staffManagementSlice.reducer;
