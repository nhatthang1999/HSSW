import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/image/logo.png";
import { HomeOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  .selected {
    background-color: rgba(243, 244, 246, 1);
    color: #fec749;
  }
`;

function CustomerSidebar({ sidebarOpen, setSidebarOpen, routes, path }) {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:hidden lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll md:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-white p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to={path} className="block">
            <img
              src={logo}
              alt=""
              style={{
                width: "48px",
                height: "48px",
                background: "#ffffff",
                borderRadius: "50%",
              }}
            />
          </NavLink>
        </div>

        {/* Links */}
        <Wrapper>
          {/* <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Pages
          </h3> */}
          <NavLink
            to="/customer"
            className={`block text-black hover:text-gray-800 hover:bg-blue-50 transition duration-150 px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
              page === "" && "hover:text-gray-200 "
            }`}
          >
            <span className="text-sm font-medium flex items-center justify-between">
              <HomeOutlined />
              Trang chủ
            </span>
          </NavLink>
          {routes.map(
            (route, key) =>
              route.isInNavBar && (
                <NavLink
                  to={route.path}
                  exact={route.exact}
                  activeClassName={"selected"}
                  key={key}
                  className={`block text-black hover:text-gray-800 hover:bg-blue-50 transition duration-150 px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
                    page === "" && "hover:text-gray-200 "
                  }`}
                  isActive={(match, location) => {
                    return pathname.indexOf(route.path) === 0 ? true : false;
                  }}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <span className="text-sm font-medium flex items-center justify-between">
                    {route.icon}
                    {route.title}
                  </span>
                </NavLink>
              )
          )}
        </Wrapper>
      </div>
    </div>
  );
}

export default CustomerSidebar;
