import { createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import {
  addNewCustomer,
  editCustomer,
  getCustomerDetail,
  searchCustomers,
} from "../../../api/customerManagement";
const initialState = {
  customers: [],
  customerDetail: {},
};

export const customerManagementSlice = createSlice({
  name: "Customer Management",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomerDetail: (state, action) => {
      state.customerDetail = action.payload;
    },
  },
});

export const { setCustomers, setCustomerDetail } =
  customerManagementSlice.actions;

export const getCustomersBySearch = (params) => async (dispatch, getState) => {
  const response = await searchCustomers(params);
  if (response !== "") {
    await dispatch(setCustomers(response.data));
    return response.data;
  }
};

export const getCustomerDetailForAdmin = (id) => async (dispatch, getState) => {
  const response = await getCustomerDetail(id);
  if (response !== "") {
    await dispatch(setCustomerDetail(response.data));
    return response.data;
  }
};

export const addNewCustomerForAdmin = (data) => async (dispatch, getState) => {
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await addNewCustomer(data);
  if (response.status === 200) {
    await notification.success({
      message: "Thêm khách hàng thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Thêm khách hàng không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export const editCustomerForAdmin = (data) => async (dispatch, getState) => {
  await editCustomer(data);
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await editCustomer(data);
  if (response.status === 200) {
    await notification.success({
      message: "Sửa thông tin khách hàng thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Sửa thông tin khách hàng không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export default customerManagementSlice.reducer;
