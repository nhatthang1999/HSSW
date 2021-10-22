// export const API_URL = "http://axsmod.com:8080/api";

//refactor code
export const loginAPIpath = {
  login: "/api/authentication/getToken",
  getRole: "/api/user/getRoleByUsername",
};

export const RegisterAPIPath = {
  register: "/api/register/registerUser",
  verifyEmail: "/api/register/verifyEmail",
};

export const authAPIpath = {
  authen: "/api/authentication/getToken",
  refresh: "/api/authentication/refreshToken",
};

export const UserAPIpath = {
  getRole: "/api/user/getRoleByUsername",
};

export const ServiceManagementAPIpath = {
  // getAll: "/api/service/getAll",
  getServiceDetail: "/api/service/getById",
  addNewService: "/api/service/addService",
  editService: "/api/service/editService",
  deleteService: "/api/service/deleteService",
  search: "/api/service/search",
};

export const NewsManagementAPIpath = {
  editNews: "/api/news/editNew",
  addNewNews: "/api/news/createNews",
  searchNews: "/api/news/searchNews",
  getNewsDetail: "/api/news/getById",
  // getAllNews: "/api/news/getAll",
  deleteNews: "/api/news/deleteNews",
};

export const DoctorManagementAPIpath = {
  getAll: "/api/doctor/getAll",
  getDoctorDetail: "/api/doctor/getById",
  addNewDoctor: "/api/doctor/add",
  editDoctor: "/api/doctor/edit",
  getAllFaculty: "/api/faculty/getAll",
  getAllSpecialty: "/api/specialty/getAll",
  getAllGroupByAcademic: "/api/specialty/getAllGroupByAcademic",
  deleteDoctor: "/api/doctor/delete",
  activeDoctor: "/api/doctor/activeDoctor",
  searchDoctor: "/api/doctor/searchDoctor",
  findByFacultyAndSpec: "/api/doctor/findByFacultyAndSpec",
  findByFacultyAndName: "/api/doctor/findByFacultyAndName",
};

export const CustomerManagementAPIpath = {
  getAll: "/api/customer/getAll",
  getPageCustomers: "/api/customer/getPageCustomers",
  getCustomerDetail: "/api/customer/getProfile",
  addNewCustomer: "/api/register/registerUser",
  editCustomer: "/api/customer/editCustomerByAdmin",
};

export const CustomerAPIpath = {
  getCustomerProfile: "/api/customer/getProfile",
  editProfileUser: "/api/customer/editMyProfile",
  rechargeMoney: "/api/customer/rechargeMoney",
};

export const StaffAPIPath = {
  getStaffProfile: "/api/staff/getById",
};

export const StaffManagementAPIpath = {
  editStaff: "/api/staff/edit",
  addNewStaff: "/api/staff/add",
  getPageStaff: "/api/staff/getPageStaff",
  getStaffDetail: "/api/staff/getById",
  getAllStaff: "/api/staff/getAll",
  activeStaff: "/api/staff/activeStaff",
  searchStaff: "/api/staff/searchStaff",
};

export const BookingAPIpath = {
  getAllFaculty: "/api/faculty/getAll",
  getAllDoctor: "/api/doctor/getAll",
  findDoctorByFacultyAndName: "/api/doctor/findByFacultyAndName",
  getAllGroupByAcademic: "/api/specialty/getAllGroupByAcademic",
  getAllOptionTime: "/api/optionTime/getAll",
  requestBooking: "/api/bookDoctor/requestBook",
  getListBookByCustomerId: "/api/bookDoctor/getListBookByCustomerId",
  cancelBooking: "/api/bookDoctor/cancelBooking",
};

export const DoctorAPIpath = {
  getScheduleDoctorById: "/api/bookDoctor/getScheduleDoctorById",
  getListBookPendingByOptionTime:
    "/api/bookDoctor/getListBookPendingByOptionTime",
  doctorAccept: "/api/bookDoctor/doctorAccept",
  getDoctorDetail: "/api/doctor/getById",
  getAllOptionTime: "/api/optionTime/getAll",
  getListBookComfirmByOptionTime:
    "/api/bookDoctor/getListBookComfirmByOptionTime",
  addBookByDoctor: "/api/bookDoctor/addBookByDoctor",
  getListBookingStatus: "/api/bookDoctor/getListBookingStatus",
  countBookingIsPending: "/api/notification/countBookingIsPending",
  countBookingComfirmToday: "/api/notification/countBookingComfirmToday",
};

export const medicalRecordManagementAPIpath = {
  getAllMedicalRecord: "/api/medicalRecord/getAll",
  createNewMedicalRecord: "/api/medicalRecord/createMedicalRecord",
  search: "/api/medicalRecord/search",
  getListDetailById: "/api/medicalRecord/getListDetailById",
  addMedicalDetail: "/api/medicalRecord/addMedicalDetail",
  editMedicalRecord: "/api/medicalRecord/editMedicalRecord",
  editMedicalDetails: "/api/medicalRecord/editMedicalDetails",
  getByCustomerId: "/api/medicalRecord/getByCustomerId",
};

export const examServiceManagementAPIpath = {
  createNewCart: "/api/cart/createNewCart",
  addItemToCart: "/api/cart/addItemToCart",
  searchCart: "/api/cart/searchCart",
  getCartDetailsById: "/api/cart/getCartDetailsById",
  deleteItemIncart: "/api/cart/deleteItemInCart",
  deleteCart: "/api/cart/deleteCart",
  payCart: "/api/cart/payCart",
  searchServiceForCart: "/api/service/search1",
};

export const PublicAPIPath = {
  getTop3News: "/api/news/searchNews",
  getTop3Doctor: "/api/doctor/searchDoctor",
  getAllFacultyPublic: "/api/faculty/getAll",
  getAllGroupByAcademic: "/api/specialty/getAllGroupByAcademic",
  getNewsDetail: "/api/news/getById",
};

export const paymentManagementAPIpath = {
  searchPaymentOfCustomer: "/api/payment/searchPaymentOfCustomer",
  searchPaymentOfAdmin: "/api/payment/searchPaymentOfAdmin",
  getPaymentDetailById: "/api/payment/getPaymentDetailById",
};

export const ChangePasswordAPIPath = {
  changePassword: "/api/user/changePassword",
};

export const ForgetPasswordAPIPath = {
  forgetPassword: "/api/forgotPass/requestChangePass",
  verifyEmail: "/api/forgotPass/verifyEmail",
  changePassword: "/api/forgotPass/changePassword",
};
