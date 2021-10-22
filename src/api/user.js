import axios from "../app/axios";
import {
  CustomerAPIpath,
  loginAPIpath,
  medicalRecordManagementAPIpath,
  paymentManagementAPIpath,
} from "../constant/api";
//get role to authorization
export const getRole = async (values) => {
  const { username } = values;
  try {
    const res = await axios.get(loginAPIpath.getRole + `/` + username);
    if (res.status === 200) {
      const { id, role } = res.data.data;
      return {
        status: 200,
        id,
        role,
      };
    }
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
//get customer profile
export const getCustomerProfile = async (id) => {
  try {
    const res = await axios.get(CustomerAPIpath.getCustomerProfile + `/` + id);
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
//edit profile by user(customer)
export const editProfileByUser = async (data) => {
  try {
    const res = await axios.put(CustomerAPIpath.editProfileUser, data);
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
//search medical records
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
//get list of medical record detail
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
//search payment for customer
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
//get payment detail by id for customer
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
//recharge money for customer
export const rechargeMoney = async (data) => {
  try {
    const res = await axios.post(CustomerAPIpath.rechargeMoney, data);
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
