import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";
import Header from "../../component/partials/Header";

const { Content } = Layout;

const Wrapper = styled.section`
  min-height: 100vh;
  background: #f1f9ff;
  width: 100%;
  position: relative;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

const AdminContent = ({ routes, sidebarOpen, setSidebarOpen }) => {
  return (
    <Wrapper>
      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Content>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            >
              {route?.redirect ? (
                <Redirect to={`${route?.redirect}`} />
              ) : (
                <route.component />
              )}
            </Route>
          ))}
        </Switch>
      </Content>
    </Wrapper>
  );
};

export default AdminContent;
