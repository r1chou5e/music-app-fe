import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllUsers } from "../api";
import { AiOutlineClear } from "react-icons/ai";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import DashboardUserCard from "./DashboardUserCard";

const DashboardUsers = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [emailFilter, setEmailFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);

  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <input
          type="text"
          placeholder="Search here"
          className={`w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />

        {emailFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setEmailFilter("");
              setFilteredUsers(null);
            }}
          >
            <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
          </motion.i>
        )}
      </div>

      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count: {""}
            </span>
            {filteredUsers ? filteredUsers?.length : allUsers?.length}
          </p>
        </div>

        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>{" "}
        </div>

        {allUsers && !filteredUsers
          ? allUsers?.map((user, index) => {
              <DashboardUserCard data={user} key={user._id} index={index} />
            })
          : filteredUsers?.map((user, index) => {})}
      </div>
    </div>
  );
};

export default DashboardUsers;
