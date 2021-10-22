import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";
import Footer from "../PublicFooter";

const { Content } = Layout;

const Wrapper = styled.section`
  min-height: 100vh;
  background-color: #ffffff;
  width: 100%;
`;

const PublicContent = ({ routes }) => {
  return (
    <Wrapper>
      <Content>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default PublicContent;
