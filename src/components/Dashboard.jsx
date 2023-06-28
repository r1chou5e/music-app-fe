import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyle, isNotActiveStyle } from "../utils/styles";

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center bg-primary">
      <Header />
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Songs
        </NavLink>
        <NavLink
          to={"/dashboard/artists"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Artists
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Albums
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
