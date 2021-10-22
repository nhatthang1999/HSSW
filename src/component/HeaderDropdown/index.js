/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import {
  UserOutlined,
  ProfileOutlined,
  KeyOutlined,
  LogoutOutlined,
  RightOutlined,
  LeftOutlined,
  WalletOutlined,
  SolutionOutlined,
  TransactionOutlined,
  ScheduleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../reducers/Login";
import { getProfile } from "../../reducers/Customer";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 20px;
  position: relative;
  font-size: 14px;
  font-weight: 500;

  a {
    color: #000000 !important;
    text-decoration: none;
  }
  a:hover {
    color: #000000 !important;
  }

  /* Top Navigation Bar */

  /* <nav> */
  .navbar {
    height: 60px;
  }

  /* <ul> */
  .navbar-nav {
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* <li> */
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Icon Button */
  .icon-button {
    --button-size: calc(60px * 0.5);
    width: var(--button-size);
    height: var(--button-size);
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.selected {
      color: #fec749;
    }
  }
  .icon-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-button:hover {
    color: #fec749;
  }

  .icon-button svg {
    width: 20px;
    height: 20px;
  }

  /* Dropdown Menu */

  .dropdown {
    position: absolute;
    top: 65px;
    width: 250px;
    transform: translateX(-45%);
    background-color: #ffffff;
    border: 1px solid #8b8b8b;
    border-radius: 8px;
    padding: 1rem;
    overflow: hidden;
    transition: all 500ms ease;
  }

  .menu {
    width: 100%;
  }

  .menu-item {
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    transition: all 500ms ease-in-out;
    padding: 5px;
    span {
      color: #000000 !important;
    }
  }

  .menu-item .icon-button {
    margin-right: 10px;
  }

  .menu-item .icon-button:hover {
    filter: none;
  }

  .menu-item:hover {
    background-color: #dadce1;
  }

  .icon-right {
    margin-left: 10px;
  }

  /* CSSTransition classes  */
  .menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease-in-out;
  }
  .menu-primary-exit {
    position: absolute;
  }
  .menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all 500ms ease-in-out;
  }

  .menu-secondary-enter {
    transform: translateX(110%);
  }
  .menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease-in-out;
  }
  .menu-secondary-exit {
  }
  .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all 500ms ease-in-out;
  }
`;

function HeaderDropdown() {
  return (
    <Wrapper>
      <Navbar>
        <NavItem icon={<UserOutlined />}>
          {/* <DropdownMenu></DropdownMenu> */}
        </NavItem>
      </Navbar>
    </Wrapper>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const DropdownMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        DropdownMenuRef.current &&
        !DropdownMenuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-item" ref={DropdownMenuRef}>
      <div
        className={`icon-button ${open ? "selected" : ""} `}
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </div>

      {/* {open && props.children} */}
      {open && <DropdownMenu open={open} setOpen={setOpen}></DropdownMenu>}
    </div>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfile());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const { customerDetail = {} } = useSelector((state) => state.customer);

  function DropdownItem(props) {
    return (
      <div
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </div>
    );
  }

  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem leftIcon={<HeartOutlined />}>
            <span>Xin chào {customerDetail?.full_name}</span>
          </DropdownItem>
          <DropdownItem leftIcon={<ProfileOutlined />}>
            <NavLink
              to="/customer/profiles"
              onClick={() => props.setOpen(!props.open)}
            >
              <span> Thông tin cá nhân</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem
            goToMenu="settings"
            leftIcon={<UserOutlined />}
            rightIcon={<RightOutlined />}
          >
            <span>Tài khoản của tôi</span>
          </DropdownItem>
          <DropdownItem leftIcon={<KeyOutlined />}>
            <NavLink
              to="/customer/changePassword"
              onClick={() => props.setOpen(!props.open)}
            >
              Đổi mật khẩu
            </NavLink>
          </DropdownItem>
          <DropdownItem leftIcon={<LogoutOutlined />}>
            <Link to="/" onClick={() => dispatch(signout())}>
              Đăng xuất
            </Link>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<LeftOutlined />}>
            <span>Tài khoản của bạn</span>
          </DropdownItem>
          <DropdownItem leftIcon={<WalletOutlined />}>
            <NavLink
              to="/customer/wallet"
              onClick={() => props.setOpen(!props.open)}
            >
              <span>Ví của tôi</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem leftIcon={<SolutionOutlined />}>
            <NavLink
              to="/customer/medicalHistory"
              onClick={() => props.setOpen(!props.open)}
            >
              <span> Hồ sơ bệnh án</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem leftIcon={<TransactionOutlined />}>
            <NavLink
              to="/customer/paymentHistory"
              onClick={() => props.setOpen(!props.open)}
            >
              <span> Lịch sử giao dịch</span>
            </NavLink>
          </DropdownItem>
          <DropdownItem leftIcon={<ScheduleOutlined />}>
            <NavLink
              to="/customer/manageBooking"
              onClick={() => props.setOpen(!props.open)}
            >
              <span>Quản lý lịch đặt khám</span>
            </NavLink>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default HeaderDropdown;
