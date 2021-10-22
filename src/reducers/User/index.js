import { createSlice } from "@reduxjs/toolkit";
import { getRole, login } from "../../api/login";

const initialState = {
  token: "",
  isAuthenticated: null,
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
  },
});

export const { setAuthen, setRole } = loginSlice.actions;

export const checkLogin = (values) => async (dispatch, getState) => {
  const response = await login(values);
  if (response !== "") {
    await dispatch(setAuthen(response));
    const data = await getRole(values);
    await dispatch(setRole(data));
    return data;
  }
};

export default loginSlice.reducer;
