import axios from "../app/axios";
import { DoctorAPIpath } from "../constant/api";
//get doctor detail
export const getDoctorDetail = async (id) => {
  try {
    const res = await axios.get(DoctorAPIpath.getDoctorDetail + "/" + id);
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
//get all option time
export const getAllOptionTime = async () => {
  try {
    const res = await axios.get(DoctorAPIpath.getAllOptionTime);
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
//get schedule timetable of doctor by doctor id
export const getScheduleDoctorById = async (data) => {
  try {
    const res = await axios.post(DoctorAPIpath.getScheduleDoctorById, data);
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
//get list of pending booking
export const getListBookPending = async (query) => {
  try {
    const res = await axios.get(DoctorAPIpath.getListBookPendingByOptionTime, {
      params: query,
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
//accept booking by doctor
export const doctorAcceptBooking = async (book_time_id) => {
  try {
    const res = await axios.put(DoctorAPIpath.doctorAccept, {
      book_time_id: book_time_id,
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
//get list of comfirmed booking
export const getListBookComfirm = async (params) => {
  try {
    const res = await axios.get(DoctorAPIpath.getListBookComfirmByOptionTime, {
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
//add booking by doctor
export const addBookByDoctor = async (data) => {
  try {
    const res = await axios.post(DoctorAPIpath.addBookByDoctor, data);
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
//get list of booking status
export const getListBookingStatus = async (doctorId) => {
  try {
    const res = await axios.get(
      DoctorAPIpath.getListBookingStatus + "/" + doctorId
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
//count pending booking
export const countBookingIsPending = async (doctorId) => {
  try {
    const res = await axios.get(
      DoctorAPIpath.countBookingIsPending + "/" + doctorId
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
//count comfirmed booking today for doctor
export const countBookingComfirmToday = async (doctorId) => {
  try {
    const res = await axios.get(
      DoctorAPIpath.countBookingComfirmToday + "/" + doctorId
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
