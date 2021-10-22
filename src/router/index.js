// import Homepage from "../page/Public/HomePage";
// import LoginPage from "../page/Public/LoginPage";
import News from "../page/Public/News";
import NewsDetailPublic from "../page/Public/News/NewsDetail";
import DoctorPublic from "../page/Public/Doctor";
import DoctorDetailPublic from "../page/Public/Doctor/DetailDoctor";
import ServiceManagement from "../page/Admin/ServiceManagement";
import { Icon } from "@iconify/react";
// import homeFilled from "@iconify-icons/ant-design/home-filled";
import calendarIcon from "@iconify-icons/fe/calendar";
import newspaperIcon from "@iconify-icons/ion/newspaper";
// import loginIcon from "@iconify-icons/carbon/login";
import personPlusFill from "@iconify-icons/bi/person-plus-fill";
import DoctorManagement from "../page/Admin/DoctorManagement";
import DoctorDetail from "../page/Admin/DoctorManagement/DoctorDetail";
import AddDoctor from "../page/Admin/DoctorManagement/AddDoctor";
import EditDoctor from "../page/Admin/DoctorManagement/EditDoctor";
import CustomerManagement from "../page/Admin/CustomerManagement";
import CustomerDetail from "../page/Admin/CustomerManagement/CustomerDetail";
import AddCustomer from "../page/Admin/CustomerManagement/AddCustomer";
import EditCustomer from "../page/Admin/CustomerManagement/EditCustomer";
import customerSupport from "@iconify-icons/si-glyph/customer-support";
import medicalCross from "@iconify-icons/oi/medical-cross";
import BookingDoctor from "../page/Customer/BookingDoctor";
import TimeTableManagement from "../page/Doctor/TimetableManagement";
import StaffManagement from "../page/Admin/StaffManagement";
import StaffDetail from "../page/Admin/StaffManagement/StaffDetail";
import AddStaff from "../page/Admin/StaffManagement/AddStaff";
import ProfileDoctor from "../page/Doctor/Profile";
import AcceptBooking from "../page/Doctor/AcceptBooking";
// import settingsIcon from "@iconify-icons/carbon/settings";
// import AccountSettings from "../page/Customer/AccountSettings";
import ManageBooking from "../page/Customer/ManageBooking";
import EditStaff from "../page/Admin/StaffManagement/EditStaff";
import MedicalRecordManagement from "../page/Admin/MedicalRecordManagement";
import MedicalRecordDetail from "../page/Admin/MedicalRecordManagement/MedicalRecordDetail";
import NewsManagement from "../page/Admin/NewsManagement";
import AddNews from "../page/Admin/NewsManagement/AddNews";
import NewsDetail from "../page/Admin/NewsManagement/NewsDetail";
import EditNews from "../page/Admin/NewsManagement/EditNews";
import ViewPublic from "../page/Admin/NewsManagement/ViewPublic";
import serviceFill from "@iconify-icons/ri/service-fill";
import medicalDoctor from "@iconify-icons/wpf/medical-doctor";
import {
  CustomerServiceOutlined,
  WalletOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  KeyOutlined,
  CalendarOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import ProfileCustomer from "../page/Customer/Profile";
import EditProfileCustomer from "../page/Customer/Profile/EditProfile";
import MedicalRecord from "../page/Customer/MedicalRecord";
import MedicalRecordDetailCustomer from "../page/Customer/MedicalRecord/MedicalRecordDetail";
import Wallet from "../page/Customer/Wallet";
import timetableIcon from "@iconify-icons/mdi/timetable";
import ProfileStaff from "../page/Staff/Profile";
import ExamServiceManament from "../page/Admin/ExamServiceManagement";
import ServiceCartDetail from "../page/Admin/ExamServiceManagement/ServiceCartDetail";
import EditBooking from "../page/Doctor/EditBooking";
import HomepageLoading from "../components/HomepageLoading";
import profileIcon from "@iconify-icons/gg/profile";
import PaymentManagement from "../page/Admin/PaymentManagement";
import PaymentDetail from "../page/Admin/PaymentManagement/PaymentDetail";
import ChangePassword from "../page/ChangePassword";
import PaymentHistory from "../page/Customer/PaymentHistory";
import PaymentHistoryDetail from "../page/Customer/PaymentHistory/PaymentDetail";
import NotFound from "../page/Public/NotFound";
import CalendarForDoctor from "../page/Doctor/Calendar";
import AboutUs from "../page/Public/AboutUs";
import Notification from "../page/Doctor/Notification";

const routes = {
  publicRoutes: {
    path: "/",
    routes: [
      {
        path: "/news",
        component: () => <News />,
        title: "Tin tức",
        isInNavbar: true,
        icon: <Icon icon={newspaperIcon} />,
        exact: true,
      },
      {
        path: "/news/:id",
        component: () => <NewsDetailPublic />,
        exact: true,
      },
      {
        path: "/doctorpublic",
        component: () => <DoctorPublic />,
        title: "Bác sĩ",
        isInNavbar: true,
        icon: <Icon icon={medicalDoctor} />,
        exact: true,
      },
      {
        path: "/doctorpublic/:id",
        component: () => <DoctorDetailPublic />,
        exact: true,
      },
      {
        path: "/aboutUs",
        component: () => <AboutUs />,
        exact: true,
      },
      {
        path: "/*",
        component: () => <NotFound />,
        icon: <Icon icon={personPlusFill} />,
      },
    ],
  },
  adminRoutes: {
    path: "/admin",
    routes: [
      {
        path: "/admin",
        component: () => <HomepageLoading />,
        title: "Trang chủ",
        isAdmin: true,
        exact: true,
        // isInSidebar: true,
      },
      {
        path: "/admin/services",
        component: () => <ServiceManagement />,
        title: "Quản lý Dịch vụ",
        isAdmin: true,
        exact: true,
        icon: <Icon icon={serviceFill} />,
        isInSidebar: true,
      },
      {
        path: "/admin/doctor",
        component: () => <DoctorManagement />,
        title: "Quản lý Bác sĩ",
        isAdmin: true,
        exact: true,
        icon: <Icon icon={medicalDoctor} />,
        isInSidebar: true,
      },
      {
        path: "/admin/doctor/add",
        component: () => <AddDoctor />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/doctor/:id",
        component: () => <DoctorDetail />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/doctor/:id/edit",
        component: () => <EditDoctor />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/customer",
        component: () => <CustomerManagement />,
        title: "Quản lý Khách hàng",
        isAdmin: true,
        exact: true,
        icon: <CustomerServiceOutlined />,
        isInSidebar: true,
      },
      {
        path: "/admin/customer/add",
        component: () => <AddCustomer />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/customer/:id",
        component: () => <CustomerDetail />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/customer/:id/edit",
        component: () => <EditCustomer />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/staff",
        component: () => <StaffManagement />,
        title: "Quản lý nhân viên",
        isAdmin: true,
        exact: true,
        icon: <Icon icon={customerSupport} />,
        isInSidebar: true,
      },
      {
        path: "/admin/staff/add",
        component: () => <AddStaff />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/staff/:id",
        component: () => <StaffDetail />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/staff/:id/edit",
        component: () => <EditStaff />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/medical",
        component: () => <MedicalRecordManagement />,
        title: "Quản lý hồ sơ bệnh án",
        isAdmin: true,
        exact: true,
        icon: <Icon icon={medicalCross} />,
        isInSidebar: true,
      },
      {
        path: "/admin/medical/:id",
        component: () => <MedicalRecordDetail />,
        isAdmin: true,
        exact: true,
      },
      // ------ news management
      {
        path: "/admin/news",
        component: () => <NewsManagement />,
        title: "Quản lý bài viết",
        isAdmin: true,
        exact: true,
        icon: <Icon icon={newspaperIcon} />,
        isInSidebar: true,
      },
      {
        path: "/admin/news/viewlistnews",
        component: () => <News />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/news/viewlistnews/:id",
        component: () => <NewsDetailPublic />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/news/add",
        component: () => <AddNews />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/news/:id",
        component: () => <NewsDetail />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/news/:id/edit",
        component: () => <EditNews />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/news/:id/view_public",
        component: () => <ViewPublic />,
        isAdmin: true,
        exact: true,
      },
      // ------ examination service management
      {
        path: "/admin/serviceCart",
        component: () => <ExamServiceManament />,
        title: "Quản lý dịch vụ khám",
        isAdmin: true,
        exact: true,
        icon: <ShoppingCartOutlined />,
        isInSidebar: true,
      },
      {
        path: "/admin/serviceCart/:id",
        component: () => <ServiceCartDetail />,
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/payments",
        component: () => <PaymentManagement />,
        title: "Quản lý thanh toán",
        isAdmin: true,
        exact: true,
        icon: <CreditCardOutlined />,
        isInSidebar: true,
      },
      {
        path: "/admin/payments/:id",
        component: () => <PaymentDetail />,
        title: "Quản lý thanh toán",
        isAdmin: true,
        exact: true,
      },
      {
        path: "/admin/*",
        component: () => <NotFound />,
        icon: <Icon icon={personPlusFill} />,
      },
      // {
      //   path: "/admin/changepassword",
      //   component: () => <ChangePassword />,
      //   title: "Thay đổi mật khẩu",
      //   isAdmin: true,
      //   exact: true,
      //   // icon: <CreditCardOutlined />,
      //   isInSidebar: true,
      // },
    ],
  },
  customerRoutes: {
    path: "/customer",
    routes: [
      // {
      //   path: "/customer",
      //   exact: true,
      //   // component: () => <Homepage />,
      //   title: "Trang chủ",
      //   icon: <Icon icon={homeFilled} />,
      //   isInNavBar: true,
      // },
      {
        path: "/customer/news",
        component: () => <News />,
        title: "Tin tức",
        icon: <Icon icon={newspaperIcon} />,
        isInNavBar: true,
        exact: true,
      },
      {
        path: "/customer/booking",
        component: () => <BookingDoctor />,
        title: "Đặt lịch khám",
        icon: <Icon icon={calendarIcon} />,
        isInNavBar: true,
      },
      {
        path: "/customer/doctorpublic",
        component: () => <DoctorPublic />,
        title: "Bác sĩ",
        icon: <Icon icon={medicalDoctor} />,
        isInNavBar: true,
        exact: true,
      },
      {
        path: "/customer/doctorpublic/:id",
        component: () => <DoctorDetailPublic />,
        exact: true,
      },
      {
        path: "/customer/news/:id",
        component: () => <NewsDetailPublic />,
        exact: true,
      },
      // {
      //   path: "/customer",
      //   component: () => <AccountSettings />,
      //   title: "Tài khoản của bạn",
      //   icon: <Icon icon={settingsIcon} />,
      //   isInSubMenu: true,
      //   isAccountSettings: true,
      //   redirect: "/customer/profiles",
      // },
      {
        path: "/customer/profiles",
        component: () => <ProfileCustomer />,
        title: "Thông tin cá nhân",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
        exact: true,
        isInSidebar: true,
      },
      {
        path: "/customer/wallet",
        component: () => <Wallet />,
        title: "Ví của tôi",
        icon: <WalletOutlined />,
        isInAccountSettings: true,
        exact: true,
        isInSidebar: true,
      },
      {
        path: "/customer/profiles/edit",
        component: () => <EditProfileCustomer />,
        title: "Sua thong tin ca nhan",
        isInAccountSettings: true,
      },
      {
        path: "/customer/medicalHistory",
        component: () => <MedicalRecord />,
        title: "Hồ sơ bệnh án",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
        isInSidebar: true,
        exact: true,
      },
      {
        path: "/customer/medicalHistory/:id",
        component: () => <MedicalRecordDetailCustomer />,
        title: "Hồ sơ bệnh án",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
      },
      {
        path: "/customer/paymentHistory",
        component: () => <PaymentHistory />,
        title: "Lịch sử giao dịch",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
        isInSidebar: true,
        exact: true,
      },
      {
        path: "/customer/paymentHistory/:id",
        component: () => <PaymentHistoryDetail />,
        title: "Lịch sử giao dịch",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
      },
      {
        path: "/customer/manageBooking",
        component: () => <ManageBooking />,
        title: "Lịch sử đặt lịch khám",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
        isInSidebar: true,
      },
      {
        path: "/customer/changePassword",
        component: () => <ChangePassword />,
        title: "Đổi mật khẩu",
        icon: <Icon icon={newspaperIcon} />,
        isInAccountSettings: true,
        isInSidebar: true,
      },
      {
        path: "/customer/aboutUs",
        component: () => <AboutUs />,
        exact: true,
      },
      {
        path: "/customer/*",
        component: () => <NotFound />,
        icon: <Icon icon={personPlusFill} />,
      },
    ],
  },
  doctorRoutes: {
    path: "/doctor",
    routes: [
      {
        path: "/doctor",
        component: () => <HomepageLoading />,
        title: "Trang chủ",
        isDoctor: true,
        exact: true,
        // isInSidebar: true,
        redirect: "/doctor/notification",
      },
      {
        path: "/doctor/notification",
        component: () => <Notification />,
        title: "Thông báo",
        isDoctor: true,
        exact: true,
        isInSidebar: true,
        icon: <NotificationOutlined />,
      },
      {
        path: "/doctor/profile",
        component: () => <ProfileDoctor />,
        title: "Thông tin cá nhân",
        isDoctor: true,
        exact: true,
        isInSidebar: true,
        icon: <Icon icon={profileIcon} />,
      },
      {
        path: "/doctor/calendar",
        component: () => <CalendarForDoctor />,
        title: "Lịch làm việc",
        isDoctor: true,
        exact: true,
        isInSidebar: true,
        icon: <CalendarOutlined />,
      },
      {
        path: "/doctor/timetable",
        component: () => <TimeTableManagement />,
        title: "Quản lý thời gian biểu",
        isDoctor: true,
        exact: true,
        isInSidebar: true,
        icon: <Icon icon={timetableIcon} />,
      },
      {
        path: "/doctor/timetable/accept",
        component: () => <AcceptBooking />,
        isDoctor: true,
      },
      {
        path: "/doctor/timetable/edit",
        component: () => <EditBooking />,
        isDoctor: true,
      },
      {
        path: "/doctor/medical",
        component: () => <MedicalRecordManagement />,
        title: "Quản lý hồ sơ bệnh án",
        isDoctor: true,
        exact: true,
        icon: <Icon icon={medicalCross} />,
        isInSidebar: true,
      },
      {
        path: "/doctor/medical/:id",
        component: () => <MedicalRecordDetail />,
        isDoctor: true,
        exact: true,
      },
      {
        path: "/doctor/serviceCart",
        component: () => <ExamServiceManament />,
        title: "Quản lý dịch vụ khám",
        isAdmin: true,
        exact: true,
        icon: <ShoppingCartOutlined />,
        isInSidebar: true,
      },
      {
        path: "/doctor/serviceCart/:id",
        component: () => <ServiceCartDetail />,
        isDoctor: true,
        exact: true,
      },
      {
        path: "/doctor/changepassword",
        component: () => <ChangePassword />,
        title: "Thay đổi mật khẩu",
        isAdmin: true,
        exact: true,
        // icon: <ShoppingCartOutlined />,
        icon: <KeyOutlined />,
        isInSidebar: true,
      },
      {
        path: "/doctor/*",
        component: () => <NotFound />,
        icon: <Icon icon={personPlusFill} />,
      },
    ],
  },
  staffRoutes: {
    path: "/staff",
    routes: [
      {
        path: "/staff",
        component: () => <HomepageLoading />,
        title: "Trang chủ",
        isStaff: true,
        exact: true,
        // isInSidebar: true,
        redirect: "/staff/profile",
      },
      {
        path: "/staff/profile",
        component: () => <ProfileStaff />,
        title: "Thông tin cá nhân",
        isStaff: true,
        exact: true,
        isInSidebar: true,
        icon: <Icon icon={profileIcon} />,
      },
      {
        path: "/staff/customer",
        component: () => <CustomerManagement />,
        title: "Quản lý Khách hàng",
        isStaff: true,
        exact: true,
        icon: <Icon icon={customerSupport} />,
        isInSidebar: true,
      },
      {
        path: "/staff/customer/add",
        component: () => <AddCustomer />,
        isStaff: true,
        exact: true,
      },
      {
        path: "/staff/customer/:id",
        component: () => <CustomerDetail />,
        isStaff: true,
        exact: true,
      },
      {
        path: "/staff/customer/:id/edit",
        component: () => <EditCustomer />,
        isStaff: true,
        exact: true,
      },
      {
        path: "/staff/medical",
        component: () => <MedicalRecordManagement />,
        title: "Quản lý hồ sơ bệnh án",
        isStaff: true,
        exact: true,
        icon: <Icon icon={medicalCross} />,
        isInSidebar: true,
      },
      {
        path: "/staff/medical/:id",
        component: () => <MedicalRecordDetail />,
        isStaff: true,
        exact: true,
      },
      {
        path: "/staff/serviceCart",
        component: () => <ExamServiceManament />,
        title: "Quản lý dịch vụ khám",
        exact: true,
        icon: <ShoppingCartOutlined />,
        isInSidebar: true,
      },
      {
        path: "/staff/serviceCart/:id",
        component: () => <ServiceCartDetail />,
        isStaff: true,
        exact: true,
      },
      {
        path: "/staff/payments",
        component: () => <PaymentManagement />,
        title: "Quản lý thanh toán",
        isStaff: true,
        exact: true,
        icon: <CreditCardOutlined />,
        isInSidebar: true,
      },
      {
        path: "/staff/payments/:id",
        component: () => <PaymentDetail />,
        title: "Quản lý thanh toán",
        isStaff: true,
        exact: true,
      },
      {
        path: "/staff/changepassword",
        component: () => <ChangePassword />,
        title: "Thay đổi mật khẩu",
        exact: true,
        icon: <KeyOutlined />,
        // icon: <ShoppingCartOutlined />,
        isInSidebar: true,
      },
      {
        path: "/staff/*",
        component: () => <NotFound />,
        icon: <Icon icon={personPlusFill} />,
      },
    ],
  },
};

export default routes;
