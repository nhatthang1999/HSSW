import { createSlice } from "@reduxjs/toolkit";
import { message, } from "antd";
import {
  addNewNews,
  deleteNews,
  searchNews,
  getNewsDetail,
  editNews,
} from "../../../api/newsManagement";

const initialState = {
  news: [],
  totalPage: 0,
  totalItem: 0,
  newsDetail: {},
};

export const newsManagementSlice = createSlice({
  name: "News Management",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
      state.totalPage = action.payload.totalPage;
      state.totalItem = action.payload.totalItem;
    },
    setNewsDetail: (state, action) => {
      state.newsDetail = action.payload;
    },
  },
});

export const { setNews, setNewsDetail } = newsManagementSlice.actions;

export const getNewsBySearch = (params) => async (dispatch, getState) => {
  const res = await searchNews(params);
  if (res.status === 200) {
    await dispatch(setNews(res.data));
    return res.data;
  }
};

export const addNewNewsForAdmin =
  (data, file) => async (dispatch, getState) => {
    await message.loading("Hành động đang được thực hiện...", 2.5);
    const response = await addNewNews(data, file);
    if (response.status === 200) return response;
  };

export const getDetailOfNews = (id) => async (dispatch, getState) => {
  const response = await getNewsDetail(id);
  if (response !== "") {
    await dispatch(setNewsDetail(response.data));
    return response.data;
  }
};

export const editNewsForAdmin =
  (data, file, isChangeImage) => async (dispatch, getState) => {
    await message.loading("Hành động đang được thực hiện...", 2.5);
    const response = await editNews(data, file, isChangeImage);
    return response;
  };

export const deleteNewsForAdmin = (id) => async (dispatch, getState) => {
  await message.loading("Hành động đang được thực hiện...", 2.5);
  const response = await deleteNews(id);
  return response;
};

export default newsManagementSlice.reducer;
