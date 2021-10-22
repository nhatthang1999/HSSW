import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import {
  getAllDoctors,
  getAllFaculty,
  findDoctorByFacultyAndName,
  getAllOptionTime,
  requestBooking,
  cancelBooking,
  getAllSpecialtyGroupByAcademic,
} from "../../api/booking";
import { getScheduleDoctorById } from "../../api/timetableManagement";

const initialState = {
  faculty: [],
  doctors: [],
  dataSearch: [],
  isDoneSearching: false,
  optionTimeTable: [],
  scheduleDoctorTable: [],
  specialtyGroupByAcademic: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFaculty: (state, action) => {
      state.faculty = action.payload;
    },
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setDataSearch: (state, action) => {
      state.dataSearch = action.payload;
    },
    setIsDoneSearching: (state, action) => {
      state.isDoneSearching = action.payload;
    },
    setOptionTimeTable: (state, action) => {
      state.optionTimeTable = action.payload;
    },
    setScheduleDoctorTable: (state, action) => {
      state.scheduleDoctorTable = action.payload;
    },
    setSpecialtyGroupByAcademic: (state, action) => {
      state.specialtyGroupByAcademic = action.payload;
    },
  },
});

export const {
  setFaculty,
  setDoctors,
  setDataSearch,
  setIsDoneSearching,
  setOptionTimeTable,
  setScheduleDoctorTable,
  setIsLoading,
  setSpecialtyGroupByAcademic,
} = bookingSlice.actions;

export const getAllFacultyForCustomer = () => async (dispatch, getState) => {
  const response = await getAllFaculty();
  if (response.status === 200) {
    await dispatch(setFaculty(response.data));
  }
};

export const getAllSpecialtyGroupByAcademicForCustomer =
  () => async (dispatch, getState) => {
    const response = await getAllSpecialtyGroupByAcademic();
    if (response.status === 200) {
      await dispatch(setSpecialtyGroupByAcademic(response.data));
    }
  };

export const getAllDoctorForCustomer = () => async (dispatch, getState) => {
  const response = await getAllDoctors();
  if (response !== "") {
    await dispatch(setDoctors(response.data));
  }
};

export const getOptionTimeTable = () => async (dispatch, getState) => {
  const response = await getAllOptionTime();
  if (response !== "") {
    await dispatch(setOptionTimeTable(response.data));
    await dispatch(setScheduleDoctorTable(response.data));
  }
};

export const getScheduleDoctorByDoctorId =
  (data) => async (dispatch, getState) => {
    const response = await getScheduleDoctorById(data);
    const scheduleTable = response.data;
    const state = getState();
    const { optionTimeTable } = state.booking;

    let copyOfTimetable = [...optionTimeTable];
    for (let i = 0; i < optionTimeTable.length; i++) {
      for (let j = 0; j < scheduleTable.length; j++) {
        if (
          optionTimeTable[i].option_time_id === scheduleTable[j].option_time_id
        ) {
          let shallowElementI = { ...optionTimeTable[i] };
          shallowElementI.status = scheduleTable[j].status;
          copyOfTimetable[i] = shallowElementI;
        }
      }
    }
    await dispatch(setScheduleDoctorTable(copyOfTimetable));
    return copyOfTimetable;
  };

export const findDoctorsByFacultyAndName =
  (facultyId, doctor_name) => async (dispatch, getState) => {
    const response = await findDoctorByFacultyAndName(facultyId, doctor_name);
    if (response !== "") {
      await dispatch(setDataSearch(response.data));
      // await dispatch(setIsDoneSearching(true));
    }
    return response.data;
  };

export const requestBookingDoctor = (data) => async (dispatch, getState) => {
  const response = await requestBooking(data);
  if (response.status === 200) {
    await dispatch(setOptionTimeTable(response.data));
  }
  return response;
};

export const cancelBookingDoctor = (id) => async (dispatch, getState) => {
  const response = await cancelBooking(id);
  if (response.status === 200) {
    await notification.success({
      message: "Huỷ đặt lịch khám thành công!",
      duration: 2.5,
    });
  } else if (response.status === 400) {
    await notification.error({
      message: "Huỷ đặt lịch khám không thành công!",
      description: `${response.message}`,
      duration: 2.5,
    });
  }
  return response;
};

export default bookingSlice.reducer;
