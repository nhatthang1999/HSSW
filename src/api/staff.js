import axios from "../app/axios";
import { StaffAPIPath } from "../constant/api";
//get profile for staff
export const getProfile = async (id) => {
  try {
    const res = await axios.get(StaffAPIPath.getStaffProfile + `/` + id);
    if (res.status === 200) return { status: 200, ...res.data };
  } catch (error) {
    // Error 😨
    if (error.response) {
      if (error.response.status === 400)
        return { status: 400, message: error.response.data.message };
    }
  }
};
