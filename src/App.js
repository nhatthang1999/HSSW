import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import PublicLayout from "./layout";
import AdminLayout from "./layout/adminLayout";
import routes from "./router";
import CustomerLayout from "./layout/customerLayout";
// import DoctorLayout from "./layout/doctorLayout";
import { focusHandling } from "cruip-js-toolkit";
import { useEffect, useState } from "react";
import Homepage from "./page/Public/HomePage";
import { notification } from "antd";
import { Icon } from "@iconify/react";
import wifiOff from "@iconify-icons/bi/wifi-off";
import wifiIcon from "@iconify-icons/bi/wifi";
import LoginPage from "./page/Public/LoginPage";
import VerifyEmail from "./page/Public/VerifyEmail";
import UpdatePassword from "./page/Public/UpdatePassword";
import RegisterPage from "./page/Public/RegisterPage";
import ForgetPasswordPage from "./page/Public/ForgetPassword";
import { ADMIN, CUSTOMER, DOCTOR, STAFF } from "./constant/role";

function App() {
  const location = useLocation();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
    if (params?.redirect === "401") {
      notification.warning({
        message: "Bạn đã hết phiên đăng nhập!",
        description: "Vui lòng đăng nhập lại!",
        duration: 2.5,
      });
    } else if (params?.redirect === "403") {
      notification.warning({
        message: "Bạn không có quyền hạn để thực hiện chức năng này!",
        description: "Vui lòng đăng nhập lại!",
        duration: 2.5,
      });
    }
  }, [location.pathname, params]); // triggered on route change

  // eslint-disable-next-line no-unused-vars
  let [online, isOnline] = useState(navigator.onLine);

  const setOnline = () => {
    notification.success({
      message: "Đã khôi phục kết nối Internet.",
      icon: <Icon icon={wifiIcon} style={{ color: "#2eff43" }} />,
      placement: "bottomLeft",
    });
    isOnline(true);
  };
  const setOffline = () => {
    notification.error({
      message: "Bạn đang offline.",
      icon: <Icon icon={wifiOff} />,
      placement: "bottomLeft",
    });
    isOnline(false);
  };

  // Register the event listeners
  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route path="/admin">
        <AdminLayout
          routes={routes.adminRoutes.routes}
          path="/admin"
          role={ADMIN}
        />
      </Route>
      <Route path="/customer" exact>
        <Homepage />
      </Route>
      <Route path="/customer">
        <CustomerLayout
          routes={routes.customerRoutes.routes}
          path="/customer"
          role={CUSTOMER}
        />
      </Route>
      <Route path="/doctor">
        <AdminLayout
          routes={routes.doctorRoutes.routes}
          path="/doctor"
          role={DOCTOR}
        />
      </Route>
      <Route path="/staff">
        <AdminLayout
          routes={routes.staffRoutes.routes}
          path="/staff"
          role={STAFF}
        />
      </Route>
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/signup" exact>
        <RegisterPage />
      </Route>
      <Route path="/forgetpassword" exact>
        <ForgetPasswordPage />
      </Route>
      <Route path="/verify" exact>
        <VerifyEmail />
      </Route>
      <Route path="/updatepassword" exact>
        <UpdatePassword />
      </Route>
      <Route path="/">
        <PublicLayout routes={routes.publicRoutes.routes} />
      </Route>
    </Switch>
  );
}

export default App;
