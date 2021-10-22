import React, { useEffect, useState } from "react";
import Header from "../components/CustomerHeader";
import CustomerContent from "../components/CustomerContent";
import { Route } from "react-router-dom";
// import Footer from "../components/PublicFooter";
// import Banner from "../assets/image";
import { Layout } from "antd";
import Chat from "../constant/Chat";
import CustomerSidebar from "../components/CustomerSidebar";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { store } from "../store";
import { getAuthorization, signout } from "../reducers/Login";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  /* overflow: hidden !important; */
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;

  .ant-layout {
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #ffffff;
    width: 100%;
  }
`;
const CustomerLayout = ({ routes, path, role }) => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
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
          <CustomerSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            routes={routes}
            path={path}
          />
          <Header
            routes={routes}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            path={path}
          />
          {/* <Banner /> */}
          <CustomerContent routes={routes} />
          <Chat />
          {/* <Footer /> */}
        </Route>
      </Layout>
    </Wrapper>
  );
};
export default CustomerLayout;
