import { createSlice } from "@reduxjs/toolkit";
import {
  getListAcceptedBookByCustomerId,
  getListCancelBookByCustomerId,
  getListPendingBookByCustomerId,
} from "../../api/booking";
import {
  getCustomerProfile,
  getListDetailById,
  searchMedicalRecords,
  editProfileByUser,
  searchPaymentOfCustomer,
  getPaymentDetailById,
} from "../../api/user";

const initialState = {
  customerDetail: {},
  listOfBooking: {
    cancel: [],
    pending: [],
    accepted: [],
  },
  medicalRecords: [],
  medicalRecordDetail: {},
  paymentHistory: [],
  paymentHistoryDetail: {},
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerDetail: (state, action) => {
      state.customerDetail = action.payload;
    },
    setCancelBooking: (state, action) => {
      state.listOfBooking.cancel = action.payload;
    },
    setPendingBooking: (state, action) => {
      state.listOfBooking.pending = action.payload;
    },
    setAcceptedBooking: (state, action) => {
      state.listOfBooking.accepted = action.payload;
    },
    setMedicalRecords: (state, action) => {
      state.medicalRecords = action.payload;
    },
    setMedicalRecordDetail: (state, action) => {
      state.medicalRecordDetail = action.payload;
    },
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload;
    },
    setPaymentHistoryDetail: (state, action) => {
      state.paymentHistoryDetail = action.payload;
    },
  },
});

export const {
  setCustomerDetail,
  setCancelBooking,
  setPendingBooking,
  setAcceptedBooking,
  setMedicalRecords,
  setMedicalRecordDetail,
  setPaymentHistory,
  setPaymentHistoryDetail,
} = customerSlice.actions;

export const getProfile = () => async (dispatch, getState) => {
  const state = getState();
  const { id } = state.login.user;
  const response = await getCustomerProfile(id);
  if (response.status === 200) {
    await dispatch(setCustomerDetail(response.data));
    return response.data;
  }
};

export const editProfileUser = (data) => async (dispatch, getState) => {
  return await editProfileByUser(data);
};

export const getCancelBookingByCustomerId =
  () => async (dispatch, getState) => {
    const state = getState();
    const { customer_id } = state.customer.customerDetail;
    const response = await getListCancelBookByCustomerId(customer_id);
    if (response.status === 200) {
      await dispatch(setCancelBooking(response.data));
      return response;
    }
  };

export const getPendingBookingByCustomerId =
  () => async (dispatch, getState) => {
    const state = getState();
    const { customer_id } = state.customer.customerDetail;
    const response = await getListPendingBookByCustomerId(customer_id);
    if (response.status === 200) {
      await dispatch(setPendingBooking(response.data));
      return response;
    }
  };

export const getAcceptedBookingByCustomerId =
  () => async (dispatch, getState) => {
    const state = getState();
    const { customer_id } = state.customer.customerDetail;
    const response = await getListAcceptedBookByCustomerId(customer_id);
    if (response.status === 200) {
      await dispatch(setAcceptedBooking(response.data));
      return response;
    }
  };

export const getMedicalRecordsBySearch =
  (params) => async (dispatch, getState) => {
    const response = await searchMedicalRecords({
      ...params,
    });
    if (response.status === 200) {
      await dispatch(setMedicalRecords(response.data));
      return response.data;
    }
  };

export const getListDetailByMedicalRecordId =
  (params) => async (dispatch, getState) => {
    const response = await getListDetailById(params);
    if (response.status === 200) {
      await dispatch(
        setMedicalRecordDetail({
          ...response.data,
        })
      );
      return response.data;
    }
  };

export const getPaymentsBySearch = (params) => async (dispatch, getState) => {
  const response = await searchPaymentOfCustomer({
    ...params,
  });
  if (response.status === 200) {
    await dispatch(setPaymentHistory(response.data));
    return response.data;
  }
};

export const getPaymentDetailsByPaymentId =
  (params) => async (dispatch, getState) => {
    const response = await getPaymentDetailById(params);
    if (response.status === 200) {
      await dispatch(setPaymentHistoryDetail(response.data));
      return response.data;
    }
  };

export default customerSlice.reducer;
