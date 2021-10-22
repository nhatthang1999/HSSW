import { createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../../api/auth";
import { getRole } from "../../api/login";

const initialState = {
  token: "",
  isAuthenticated: false,
  isLoading: false,
  message: null,
  user: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthen: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setRole: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      // state = undefined;
    },
  },
});

export const { setAuthen, setRole, logout } = loginSlice.actions;

export const checkLogin = (values) => async (dispatch, getState) => {
  const response = await authenticate(values);
  if (response.status === 200) {
    await dispatch(setAuthen(response));
    const data = await getRole(values);
    await dispatch(setRole(data));
    return { status: 200, ...data };
  }
  return response;
};

export const getAuthorization = (values) => async (dispatch, getState) => {
  const state = getState();
  return state.login.user;
};

export const signout = () => async (dispatch, getState) => {
  await dispatch(logout());
};

export default loginSlice.reducer;
