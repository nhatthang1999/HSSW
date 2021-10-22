import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";
import {
  addBookByDoctor,
  countBookingComfirmToday,
  countBookingIsPending,
  doctorAcceptBooking,
  getAllOptionTime,
  getDoctorDetail,
  getListBookComfirm,
  getListBookingStatus,
  getListBookPending,
  getScheduleDoctorById,
} from "../../api/timetableManagement";

const initialState = {
  doctorDetail: {},
  optionTimeTable: [],
  listBookPending: [],
  scheduleDoctorTable: [],
  comfirmedTimeContent: {},
  editBooking: {},
  calendar: [],
  notification: {
    pending: 0,
    acceptedToday: 0,
  },
};

export const timetableManagementSlice = createSlice({
  name: "Timetable Management",
  initialState,
  reducers: {
    setDoctorDetail: (state, action) => {
      state.doctorDetail = action.payload;
    },
    setOptionTimeTable: (state, action) => {
      state.optionTimeTable = action.payload;
    },
    setScheduleDoctorTable: (state, action) => {
      state.scheduleDoctorTable = action.payload;
    },
    setListBookPending: (state, action) => {
      state.listBookPending = action.payload;
    },
    setComfirmedTimeContent: (state, action) => {
      state.comfirmedTimeContent = action.payload;
    },
    setEditBooking: (state, action) => {
      state.editBooking = action.payload;
    },
    setCalendar: (state, action) => {
      state.calendar = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const {
  setDoctorDetail,
  setOptionTimeTable,
  setListBookPending,
  setScheduleDoctorTable,
  setComfirmedTimeContent,
  setEditBooking,
  setCalendar,
  setNotification,
} = timetableManagementSlice.actions;

export const getDetailOfDoctor = (id) => async (dispatch, getState) => {
  const response = await getDoctorDetail(id);
  if (response.status === 200) {
    await dispatch(setDoctorDetail(response.data));
    return response.data;
  }
};

export const getOptionTimeTable = () => async (dispatch, getState) => {
  const response = await getAllOptionTime();
  if (response.status === 200) {
    await dispatch(setOptionTimeTable(response.data));
  }
};

export const getScheduleDoctorByDoctorId =
  (data) => async (dispatch, getState) => {
    const response = await getScheduleDoctorById(data);
    if (response.status === 200) {
      const scheduleTable = response.data;
      const state = getState();
      const { optionTimeTable } = state.timetableManagement;

      let copyOfTimetable = [...optionTimeTable];
      for (let i = 0; i < optionTimeTable.length; i++) {
        for (let j = 0; j < scheduleTable.length; j++) {
          if (
            optionTimeTable[i].option_time_id ===
            scheduleTable[j].option_time_id
          ) {
            let shallowElementI = { ...optionTimeTable[i] };
            shallowElementI.status = scheduleTable[j].status;
            copyOfTimetable[i] = shallowElementI;
          }
        }
      }
      await dispatch(setScheduleDoctorTable(copyOfTimetable));
    }
  };

export const getListBookPendingByOptionTime =
  (query) => async (dispatch, getState) => {
    const response = await getListBookPending(query);
    if (response.status === 200) {
      await dispatch(setListBookPending(response.data));
      return response.data;
    }
  };

export const acceptBookingByDoctor =
  (book_time_id) => async (dispatch, getState) => {
    const response = await doctorAcceptBooking(book_time_id);
    if (response.status === 200) {
      return response;
    }
  };

export const getListBookComfirmByOptionTime =
  (query) => async (dispatch, getState) => {
    const response = await getListBookComfirm(query);
    if (response.status === 200) {
      await dispatch(setComfirmedTimeContent(response.data));
      return response.data;
    }
  };

export const addBookingByDoctor = (data) => async (dispatch, getState) => {
  const response = await addBookByDoctor(data);
  return response;
};

export const setEditBookingContent = (data) => async (dispatch, getState) => {
  await dispatch(setEditBooking(data));
};

export const getCalendarData = (doctorId) => async (dispatch, getState) => {
  const response = await getListBookingStatus(doctorId);
  if (response.status === 200) {
    await dispatch(setCalendar(response.data));
    return response.data;
  }
};

export const getNotification = (doctorId) => async (dispatch, getState) => {
  const pending = await countBookingIsPending(doctorId);
  const acceptedToday = await countBookingComfirmToday(doctorId);
  if (pending.status === 200 && acceptedToday.status === 200) {
    await dispatch(
      setNotification({
        pending: pending.data,
        acceptedToday: acceptedToday.data,
      })
    );
    return { pending: pending.data, acceptedToday: acceptedToday.data };
  }
};

export default timetableManagementSlice.reducer;
