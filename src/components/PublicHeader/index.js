import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../../assets/image";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 300px;
  z-index: 9;
  background: #ffffff;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 5%);
  height: 60px;
  .main-menu-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    a {
      /* color: #ffffff; */
      &:hover {
        color: #fec749;
      }
    }
  }
  .header_link {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    color: #000000;
    position: relative;
    font-size: 16px;
    font-weight: 500;
    .nav_item {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .ant-ribbon {
        top: -20px;
      }
      .ant-ribbon.ant-ribbon-placement-end {
        right: -16px;
        border-bottom-right-radius: 0;
      }
    }
    .nav_item::before {
      content: "";
      width: 0;
      left: 50%;
      height: 2px;
      bottom: -1px;
      transform: translateX(-50%);
      background-color: #f6ae36;
      position: absolute;
    }
    .nav_item:hover::before {
      background-color: #f6ae36;
    }
    .nav_item:hover::before {
      width: 80%;
      transition: width 0.5s ease 0s;
    }

    &:hover {
      color: #fec749;
    }
    & > a {
      color: #000000;
      &.selected {
        color: #fec749;
        .nav_item::after {
          content: "";
          width: 80%;
          left: 50%;
          height: 2px;
          bottom: -1px;
          transform: translateX(-50%);
          background-color: #f6ae36;
          position: absolute;
        }
      }
    }
  }
  @media (max-width: 1440px) {
    padding: 0 150px;
  }
  @media (max-width: 1199px) {
    padding: 0 70px;
  }
  @media (max-width: 1023px) {
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 992px) {
    padding: 0 50px;
  }
  @media (max-width: 767px) {
    padding: 0 40px;
  }
  @media (max-width: 576px) {
    padding: 0 25px;
  }
`;

const PublicHeader = ({ routes, sidebarOpen, setSidebarOpen }) => {
  return (
    <Wrapper>
      <div className="logo">
        <div className="flex">
          {/* Hamburger button */}
          <button
            className="text-gray-500 hover:text-gray-600 lg:hidden"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>
        <NavLink to="/" className="hidden_responsive">
          <Logo />
        </NavLink>
      </div>
      <div className="main-menu-wrapper">
        <div className={`header_link hidden_responsive`}>
          <NavLink to="/">
            <span className="nav_item">Trang chủ</span>
          </NavLink>
        </div>
        {routes.map(
          (route, key) =>
            route.isInNavbar && (
              <div className={`header_link hidden_responsive `} key={key}>
                <NavLink
                  to={route.path}
                  exact={route.exact}
                  activeClassName={"selected"}
                  key={key}
                  isActive={(match, location) => {
                    return location.pathname.indexOf(route.path) === 0
                      ? true
                      : false;
                  }}
                >
                  <span className="nav_item">{route.title}</span>
                </NavLink>
              </div>
            )
        )}
        <div className={`header_link`}>
          <NavLink to="/login">
            <span className="nav_item">Đăng nhập</span>
          </NavLink>
        </div>
        <div className={`header_link`}>
          <NavLink to="/signup">
            <span className="nav_item">Đăng ký</span>
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default PublicHeader;
