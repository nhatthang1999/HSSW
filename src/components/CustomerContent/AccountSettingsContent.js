import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

const Wrapper = styled.section`
  min-height: 100vh;
  background-color: #ffffff;
  width: 100%;
`;

const AccountSettingsContent = ({ routes }) => {
  return (
    <Wrapper>
      <Content>
        <Switch>
          {routes.map(
            (route, index) =>
              route.isInAccountSettings && (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              )
          )}
        </Switch>
      </Content>
    </Wrapper>
  );
};

export default AccountSettingsContent;
