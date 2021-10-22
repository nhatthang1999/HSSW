import { getProfile } from "../../../api/staff";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staff: [],
    staffDetail: {},
};

export const staffProfileSlice = createSlice({
    name: "Staff Profile",
    initialState,
    reducers: {
        staffDetail: (state, action) => {
            state.customers = action.payload;
        },
        setStaffDetail: (state, action) => {
            state.customerDetail = action.payload;
        },
    },
});

export const getProfileStaff = () => async (dispatch, getState) => {
    const state = getState();
    const { id } = state.login.user;
    const response = await getProfile(id);
    if (response.status === 200) {
        return response.data;
    }
};

export default staffProfileSlice.reducer;