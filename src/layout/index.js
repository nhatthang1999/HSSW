import React, { useState } from "react";
import Header from "../components/PublicHeader";
import Content from "../components/Content";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import Chat from "../constant/Chat";
import PublicSidebar from "../components/PublicSidebar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  /* overflow: hidden !important; */
  margin-top: 60px;
  .ant-layout {
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #ffffff;
  }
`;
const PublicLayout = ({ routes }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Wrapper>
      <Layout>
        <Route>
          <PublicSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            routes={routes}
            path="/"
            all
          />
          <Header
            routes={routes}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Content routes={routes} />
          <Chat />
        </Route>
      </Layout>
    </Wrapper>
  );
};
export default PublicLayout;
