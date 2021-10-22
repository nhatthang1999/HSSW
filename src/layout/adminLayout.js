import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../component/partials/Sidebar";
import { Layout, notification } from "antd";
import AdminContent from "../components/AdminContent";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getAuthorization, signout } from "../reducers/Login";
import { store } from "../store";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  /* overflow: hidden !important; */
  overflow-x: auto;
  overflow-y: auto;
  .ant-layout {
    display: flex;
    flex: auto;
    flex-direction: initial;
    min-height: 0;
    background: #ffffff;
  }
`;

const AdminLayout = ({ routes, path, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const windowWidth = window.screen.width;
    if (windowWidth < 576) {
      notification.info({
        message: "Xoay màn hình để được trải nghiệm cảm giác tốt nhất!",
        duration: 2.5,
      });
    }
    const authorize = async () => {
      const response = await dispatch(getAuthorization());

      if (response.role !== role) {
        await store.dispatch(signout());
        window.location = "/login?redirect=403";
      }
    };

    authorize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Layout>
        <Route>
          {/* Sidebar */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            routes={routes}
            path={path}
          />

          {/* Content area */}
          <AdminContent
            routes={routes}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </Route>
      </Layout>
    </Wrapper>
  );
};

export default AdminLayout;
