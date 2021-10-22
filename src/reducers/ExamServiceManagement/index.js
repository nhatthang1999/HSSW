import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  createNewCart,
  deleteCart,
  deleteItemInCart,
  getCartDetailsById,
  payCart,
  searchCart,
} from "../../api/examServiceManagement";

const initialState = {
  serviceCarts: [],
  totalPage: 0,
  totalItem: 0,
  serviceCartDetail: {},
};

export const serviceCartManagementSlice = createSlice({
  name: "Examination Service Management",
  initialState,
  reducers: {
    setServiceCarts: (state, action) => {
      state.serviceCarts = action.payload.list_cart_responses;
      state.totalPage = action.payload.totalPage;
      state.totalItem = action.payload.totalItem;
    },
    setServiceCartsDetail: (state, action) => {
      state.serviceCartDetail = action.payload;
    },
  },
});

export const { setServiceCarts, setServiceCartsDetail } =
  serviceCartManagementSlice.actions;

export const createNewServiceCart = (data) => async (dispatch, getState) => {
  const response = await createNewCart(data);
  return response;
};

export const addItemToServiceCart = (data) => async (dispatch, getState) => {
  const response = await addItemToCart(data);
  return response;
};

export const getServiceCartsBySearch =
  (params) => async (dispatch, getState) => {
    const response = await searchCart(params);
    if (response.status === 200) {
      await dispatch(setServiceCarts(response.data));
      return response.data;
    }
  };

export const getCartDetailsByCartId =
  (params) => async (dispatch, getState) => {
    const response = await getCartDetailsById(params);
    if (response.status === 200) {
      await dispatch(setServiceCartsDetail(response.data));
      return response.data;
    }
  };

export const deleteItemInServiceCart =
  (params) => async (dispatch, getState) => {
    const response = await deleteItemInCart(params);
    return response;
  };

export const deleteServiceCart = (params) => async (dispatch, getState) => {
  const response = await deleteCart(params);
  return response;
};
export const payServiceCart = (params) => async (dispatch, getState) => {
  const response = await payCart(params);
  return response;
};

export default serviceCartManagementSlice.reducer;
