import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthorization, signout } from "../../../reducers/Login";
import Transition from "../../utils/Transition";

// import UserAvatar from "../../../assets/image/doctor1.jpg";
import _ from "lodash";
import { ADMIN, DOCTOR, roleIntl, STAFF } from "../../../constant/role";
import { getProfileStaff } from "../../../reducers/Staff/Profile";
import { getProfileDoctor } from "../../../reducers/adminManagement/DoctorManagement";

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const dispatch = useDispatch();

  const [authorization, setAuthorization] = useState();
  const [profile, setProfile] = useState();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  // get profile and role
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getAuthorization());
      setAuthorization(response);
      if (response.role === DOCTOR) {
        const res = await dispatch(getProfileDoctor());
        setProfile(res);
      } else if (response.role === STAFF) {
        const res = await dispatch(getProfileStaff());
        setProfile(res);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const role = _.get(authorization, "role", "");

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <img
          className="w-8 h-8 rounded-full"
          src={UserAvatar}
          width="32"
          height="32"
          alt="User"
        /> */}
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
            {role === ADMIN ? "Admin" : _.get(profile, "full_name", "Username")}
          </span>
          <svg
            className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">
              {role === ADMIN
                ? "Admin"
                : _.get(profile, "full_name", "Username")}
            </div>
            <div className="text-xs text-gray-500 italic">
              {_.get(roleIntl, `${role}`, "").toUpperCase()}
            </div>
          </div>
          <ul>
            {/* <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Quản lý thông tin
              </Link>
            </li> */}
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  dispatch(signout());
                }}
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
