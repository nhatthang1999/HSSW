import { createSlice } from "@reduxjs/toolkit";
import { getTop3DoctorInHomePage, getTop3NewsInHomePage, searchDoctors, searchNewsPublic, getAllFacultyPublic, getAllSpecialtyGroupByAcademic, getNewsDetail } from "../../api/Public";

const initialState = {
  public: [],
  totalItem: 0,
  totalPage: 0,
};

export const publicSlice = createSlice({
  name: "Public",
  initialState,
  reducers: {
    setPublic: (state, action) => {
      state.public = action.payload.listNewsResponses;
      state.totalItem = action.payload.totalItem;
      state.totalPage = action.payload.totalPage;
    },
    setFaculty: (state, action) => {
      state.faculty = action.payload;
    },
    setSpecialtyGroupByAcademic: (state, action) => {
      state.specialtyGroupByAcademic = action.payload;
    },
    setNewsDetail: (state, action) => {
      state.newsDetail = action.payload;
    }
  },
});

export const {
  setPublic,
  setFaculty,
  setSpecialtyGroupByAcademic,
  setNewsDetail
} = publicSlice.actions;

export const getTop3News = (data) => async (dispatch, getState) => {
  const res = await getTop3NewsInHomePage(data);
  if (res.status === 200) {
    await dispatch(setPublic(res.data));
    return res.data;
  }
};

export const getTop3Doctor = (data) => async (dispatch, getState) => {
  const res = await getTop3DoctorInHomePage(data);
  if (res.status === 200) {
    return res.data;
  }
};

export const getDoctorsBySearch = (data) => async (dispatch, getState) => {
  const res = await searchDoctors(data);
  if (res.status === 200) {
    return res.data;
  }
};

export const searchNews = (data) => async (dispatch, getState) => {
  const res = await searchNewsPublic(data);
  if (res.status === 200) {
    await dispatch(setPublic(res.data));
    return res.data;
  }
};

export const getDetailOfNews = (id) => async (dispatch, getState) => {
  const response = await getNewsDetail(id);
  if (response !== "") {
    await dispatch(setNewsDetail(response.data));
    return response.data;
  }
};

export const getAllFaculty = () => async (dispatch, getState) => {
  const response = await getAllFacultyPublic();
  if (response !== "") {
    await dispatch(setFaculty(response.data));
  }
};

export const getAllSpecialtyGroupByAcademicForAdmin =
  () => async (dispatch, getState) => {
    const response = await getAllSpecialtyGroupByAcademic();
    if (response !== "") {
      await dispatch(setSpecialtyGroupByAcademic(response.data));
    }
  };



export default publicSlice.reducer;
