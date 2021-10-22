import axios from "../app/axios";
import { paymentManagementAPIpath } from "../constant/api";
//search payment of admin
export const searchPaymentOfAdmin = async (params) => {
  try {
    const res = await axios.get(paymentManagementAPIpath.searchPaymentOfAdmin, {
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
//search payment of customer
export const searchPaymentOfCustomer = async (params) => {
  try {
    const res = await axios.get(
      paymentManagementAPIpath.searchPaymentOfCustomer,
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
//get payment detail by id
export const getPaymentDetailById = async (params) => {
  try {
    const res = await axios.get(paymentManagementAPIpath.getPaymentDetailById, {
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
