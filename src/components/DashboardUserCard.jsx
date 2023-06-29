import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { changeUserRole, getAllUsers, removeUser } from "../api";
import { actionType } from "../context/reducer";
import { MdDelete } from "react-icons/md";

const DashboardUserCard = ({ data, index }) => {
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  const updateUserRole = (id, role) => {
    setIsUserRoleUpdated(false);
    changeUserRole(id, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.users,
          });
        });
      }
    });
  };

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.users,
          });
        });
      }
    })
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
          onClick={() => deleteUser(data._id)}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}

      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={data.imageUrl}
          referrerPolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verified ? (
          <AiOutlineCheck className="inline-block w-5 h-5" />
        ) : (
          ""
        )}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>

      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor w-275 min-w-[160px] text-center">
          {data.role}
        </p>
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
            onClick={() => setIsUserRoleUpdated(true)}
          >
            {data.role === "admin" ? "member" : "admin"}
          </motion.p>
        )}

        {isUserRoleUpdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 righ-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md"
          >
            <p className="text-textColor text-sm font-semibold">
              Are you sure to set this user as{" "}
              <span>{data.role === "admin" ? "member" : "admin"} ?</span>
            </p>
            <div className="flex items-center gap-4 ">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
                onClick={() => {
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  );
                }}
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md"
                onClick={() => setIsUserRoleUpdated(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardUserCard;
