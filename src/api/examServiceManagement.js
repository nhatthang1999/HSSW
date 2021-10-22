import axios from "../app/axios";
import { examServiceManagementAPIpath } from "../constant/api";
//create new cart
export const createNewCart = async (data) => {
  try {
    const res = await axios.post(
      examServiceManagementAPIpath.createNewCart,
      data
    );
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
      if (error.response.status === 500)
        return { status: 500, message: error.response.statusText };
    }
  }
};
//add item to cart
export const addItemToCart = async (data) => {
  try {
    const res = await axios.post(
      examServiceManagementAPIpath.addItemToCart,
      data
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
//search cart by params
export const searchCart = async (params) => {
  try {
    const res = await axios.get(examServiceManagementAPIpath.searchCart, {
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
//get cart detail by id
export const getCartDetailsById = async (params) => {
  try {
    const res = await axios.get(
      examServiceManagementAPIpath.getCartDetailsById,
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
//delete item in cart
export const deleteItemInCart = async (params) => {
  try {
    const res = await axios.delete(
      examServiceManagementAPIpath.deleteItemIncart,
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
//delete cart
export const deleteCart = async (params) => {
  try {
    const res = await axios.delete(examServiceManagementAPIpath.deleteCart, {
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
//pay cart
export const payCart = async (params) => {
  try {
    const res = await axios.get(examServiceManagementAPIpath.payCart, {
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
//search service to add to cart
export const searchServiceForCart = async (params) => {
  try {
    const res = await axios.get(
      examServiceManagementAPIpath.searchServiceForCart,
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
