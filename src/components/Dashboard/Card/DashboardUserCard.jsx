import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";
import { useStateValue } from "../../../context/StateProvider";
import { motion } from "framer-motion";
import { changeUserRole, getAllUsers, removeUser } from "../../../api";
import { actionType } from "../../../context/reducer";
import { MdDelete, MdEdit } from "react-icons/md";
import ConfirmModal from "../../Modal/ConfirmModal";

const DashboardUserCard = ({ data, index }) => {
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
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
    });
  };

  return (
    <>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
      >
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

        <p className="text-base text-textColor w-275 min-w-[160px] text-center">
          {data.role}
        </p>

        <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6">
          {data._id !== user?.user._id && (
            <>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="rounded-md flex items-center justify-center bg-gray-200 p-1"
                onClick={() => setOpenConfirmModal(true)}
              >
                <MdDelete className="text-xl text-red-400 hover:text-red-500" />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="rounded-md flex items-center justify-center bg-gray-200 p-1"
              >
                <MdEdit className="text-xl text-gray-400 hover:text-gray-500" />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
      <ConfirmModal
        open={openConfirmModal}
        handleClose={() => setOpenConfirmModal(false)}
        handleConfirm={() => deleteUser(data._id)}
      />
    </>
  );
};

export default DashboardUserCard;
