import { createSlice } from "@reduxjs/toolkit";
import { registerUser, verifyEmail } from "../../api/registerUser";

const initialState = {
  register: [],
};

export const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    setRegister: (state, action) => {
      state.register = action.payload;
    },
  },
});

export const { setRegister } = registerSlice.actions;

export const registerAccountByCustomer =
  (data) => async (dispatch, getState) => {
    const res = await registerUser(data);
    return res;
  };

export const verifyAccount = (data) => async (dispatch, getState) => {
  const res = await verifyEmail(data);
  if (res.status === 200) {
    return { status: 200, ...data };
  }
};

export default registerSlice.reducer;
