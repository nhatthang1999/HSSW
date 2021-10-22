import { createSlice } from "@reduxjs/toolkit";
import {
  addNewService,
  deleteService,
  editService,
  searchService,
} from "../../../api/serviceManagement";

const initialState = {
  services: [],
  totalPage: 0,
  totalItem: 0,
  serviceDetail: {},
};

export const serviceManagementSlice = createSlice({
  name: "Service Management",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
      state.totalPage = action.payload.totalPage;
      state.totalItem = action.payload.totalItem;
    },
    setServiceDetail: (state, action) => {
      state.serviceDetail = action.payload;
    },
  },
});

export const { setServices, setServiceDetail } = serviceManagementSlice.actions;

export const getServicesBySearch = (params) => async (dispatch, getState) => {
  const response = await searchService(params);
  if (response.status === 200) {
    await dispatch(setServices(response.data));
    return response.data;
  }
};

export const addNewServiceForAdmin = (data) => async (dispatch, getState) => {
  const response = await addNewService(data);
  return response;
};

export const editServiceForAdmin = (data) => async (dispatch, getState) => {
  const response = await editService(data);
  return response;
};

export const deleteServiceForAdmin = (data) => async (dispatch, getState) => {
  const response = await deleteService(data);
  return response;
};

export default serviceManagementSlice.reducer;
