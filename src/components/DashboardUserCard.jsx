import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";

const DashboardUserCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <motion.div
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
          <motion.div className="absolute z-10 top-6 righ-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md">
            <p className="text-textColor text-sm font-semibold">
              Are you sure to set this user as{" "}
              <span>{data.role === "admin" ? "member" : "admin"} ?</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardUserCard;
