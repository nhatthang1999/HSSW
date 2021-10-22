import { combineReducers } from "redux";
import authReducer from "./Login";

import serviceManagementReducer from "./adminManagement/ServiceManagement";
import doctorManagementReducer from "./adminManagement/DoctorManagement";
import customerManagementReducer from "./adminManagement/CustomerManagement";
import staffManagementReducer from "./adminManagement/StaffManagement";
import newsManagementReducer from "./adminManagement/NewsManagement";

import customerReducer from "./Customer";
import bookingReducer from "./Booking";
import timetableManagementReducer from "./TimetableManagement";
import medicalRecordsManagementReducer from "./MedicalRecordManagement";
import serviceCartManagementReducer from "./ExamServiceManagement";
import paymentManagementReducer from "./PaymentManagement";
import homePublic from "./Public";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  login: authReducer,

  serviceManagement: serviceManagementReducer,
  doctorManagement: doctorManagementReducer,
  customerManagement: customerManagementReducer,
  staffManagement: staffManagementReducer,
  newsManagement: newsManagementReducer,

  customer: customerReducer,
  booking: bookingReducer,
  timetableManagement: timetableManagementReducer,
  medicalRecordsManagement: medicalRecordsManagementReducer,
  serviceCartManagement: serviceCartManagementReducer,
  paymentManagement: paymentManagementReducer,
  homePublic: homePublic,
});

const rootReducer = (state, action) => {
  if (action.type === "login/logout") {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
