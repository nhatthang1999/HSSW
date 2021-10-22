import axios from "../app/axios";
import { BookingAPIpath } from "../constant/api";
import {
  ACCEPTED_STATUS,
  CANCEL_STATUS,
  PENDING_STATUS,
} from "../constant/ManageBooking";

export const getAllDoctors = async () => {
  try {
    const res = await axios.get(BookingAPIpath.getAllDoctor);
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
//get all faculty for customer
export const getAllFaculty = async () => {
  try {
    const res = await axios.get(BookingAPIpath.getAllFaculty);
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
//get all specialty group by academic for customer
export const getAllSpecialtyGroupByAcademic = async () => {
  try {
    const res = await axios.get(BookingAPIpath.getAllGroupByAcademic);
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
//find doctor by faculty and name following customer input
export const findDoctorByFacultyAndName = async (facultyId, doctor_name) => {
  try {
    const res = await axios.get(BookingAPIpath.findDoctorByFacultyAndName, {
      params: {
        facultyId: facultyId,
        fullname: doctor_name,
      },
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
//get all option time for customer
export const getAllOptionTime = async () => {
  try {
    const res = await axios.get(BookingAPIpath.getAllOptionTime);
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
//request booking for customer
export const requestBooking = async (data) => {
  try {
    const res = await axios.post(BookingAPIpath.requestBooking, data);
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
//get list of canceling booking by customer id
export const getListCancelBookByCustomerId = async (customerId) => {
  try {
    const res = await axios.get(BookingAPIpath.getListBookByCustomerId, {
      params: {
        customerId: customerId,
        status: CANCEL_STATUS,
      },
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
//get list of pending booking by customer id
export const getListPendingBookByCustomerId = async (customerId) => {
  try {
    const res = await axios.get(BookingAPIpath.getListBookByCustomerId, {
      params: {
        customerId: customerId,
        status: PENDING_STATUS,
      },
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
//get list of accepted booking by customer id
export const getListAcceptedBookByCustomerId = async (customerId) => {
  try {
    const res = await axios.get(BookingAPIpath.getListBookByCustomerId, {
      params: {
        customerId: customerId,
        status: ACCEPTED_STATUS,
      },
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
//cancel booking for customer
export const cancelBooking = async (id) => {
  try {
    const res = await axios.delete(BookingAPIpath.cancelBooking + "/" + id);
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
