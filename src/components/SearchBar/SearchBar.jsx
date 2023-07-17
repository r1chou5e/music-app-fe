import React, { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const SearchBar = ({ type }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="w-full flex justify-center items-center gap-3">
      <NavLink
        to={`/dashboard/new-${type}`}
        className="flex items-center justify-center px-4 py-3 rounded-2xl bg-white hover:shadow-md cursor-pointer"
      >
        <IoAdd />
      </NavLink>

      <input
        type="text"
        className={`w-52 px-4 py-2 ${
          isFocus ? "shadow-md" : ""
        } rounded-2xl bg-white outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
        placeholder="Search here..."
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      />

      <i>
        <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
      </i>
    </div>
  );
};

export default SearchBar;
