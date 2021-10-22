import axios from "../app/axios";
import { CustomerManagementAPIpath, CustomerAPIpath } from "../constant/api";
//search customers
export const searchCustomers = async (params) => {
  try {
    const res = await axios.get(CustomerManagementAPIpath.getPageCustomers, {
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
//get customer detail
export const getCustomerDetail = async (id) => {
  try {
    const res = await axios.get(
      CustomerManagementAPIpath.getCustomerDetail + "/" + id
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
//add new customer
export const addNewCustomer = async (data) => {
  try {
    const res = await axios.post(
      CustomerManagementAPIpath.addNewCustomer,
      data
    );
    if (res.status === 200) return { status: 200, data: res.data };
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
//edit customer
export const editCustomer = async (data) => {
  try {
    const res = await axios.post(CustomerManagementAPIpath.editCustomer, data);
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
//edit profile by user (customer)
export const editProfileByUser = async (data) => {
  try {
    const res = await axios.post(CustomerAPIpath.editProfileUser, data);
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
