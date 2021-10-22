import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const Logo = styled.div`
  width: 100%;
  height: 80px;
  color: #212529;
  padding: 20px;
  background: #ffffff;
`;

const Wrapper = styled.section`
  min-height: 100vh;
  background: #ffffff;
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0;
  }
`;

const AdminSidebar = ({ routes }) => {
  return (
    <Wrapper>
      <Sider breakpoint="xl" collapsedWidth="0" width="220px">
        <Logo>Logo here</Logo>
        <Menu mode="inline" defaultSelectedKeys={["0"]}>
          {routes.map(
            (route, key) =>
              route.isInSidebar && (
                <Menu.Item key={key} icon={route.icon}>
                  <NavLink
                    to={route.path}
                    exact={route.exact}
                    activeClassName="selected"
                    key={key}
                  >
                    {route.title}
                  </NavLink>
                </Menu.Item>
              )
          )}
        </Menu>
      </Sider>
    </Wrapper>
  );
};

export default AdminSidebar;
