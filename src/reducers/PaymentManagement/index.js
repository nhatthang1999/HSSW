import { createSlice } from "@reduxjs/toolkit";
import {
  getPaymentDetailById,
  searchPaymentOfAdmin,
} from "../../api/paymentManagement";

const initialState = {
  payments: [],
  totalPage: 0,
  totalItem: 0,
  paymentDetail: {},
};

export const paymentManagementSlice = createSlice({
  name: "Payment Management",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload.listPaymentResponse;
      state.totalPage = action.payload.totalPage;
      state.totalItem = action.payload.totalItem;
    },
    setPaymentDetail: (state, action) => {
      state.paymentDetail = action.payload;
    },
  },
});

export const { setPayments, setPaymentDetail } = paymentManagementSlice.actions;

export const getPaymentsBySearch = (params) => async (dispatch, getState) => {
  const response = await searchPaymentOfAdmin(params);
  if (response.status === 200) {
    await dispatch(setPayments(response.data));
    return response.data;
  }
};

export const getPaymentDetailsByPaymentId =
  (params) => async (dispatch, getState) => {
    const response = await getPaymentDetailById(params);
    if (response.status === 200) {
      await dispatch(setPaymentDetail(response.data));
      return response.data;
    }
  };

export default paymentManagementSlice.reducer;
