// import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
// import { message } from "antd";
import { changePassword, requestChangeForgetPassword } from "../../api/changePassword";
import { verifyAccount, changePasswordPublic } from "../../api/Public";


export const requestChangePassword = (data) => async (dispatch, getState) => {
    const response = await changePassword(data);
    if (response.status === 200) {
        return response.data;
    } else return response
};

export const requestChangepassword = (data) => async (dispatch, getState) => {
    const response = await requestChangeForgetPassword(data);
    if (response.status === 200) {
        return response.data;
    } else {
        return response;
    }
}

export const getUserForget = (data) => async (dispatch, getState) => {
    const email = _.get(data, "email", "");
    const register_email_token = _.get(data, "token", "");
    const response = await verifyAccount({ email, register_email_token });
    if (response.status === 200) {
        return response;
    } else return response
};

export const changePasswordForgot = (data) => async (dispatch, getState) => {
    const response = await changePasswordPublic(data);
    if (response.status === 200) {
        return response.data;
    } else {
        return response;
    }
}
