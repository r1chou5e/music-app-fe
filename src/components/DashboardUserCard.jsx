import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import moment from "moment";

const DashboardUserCard = ({ data, index }) => {

  

  return (
    <div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
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
        {data.createdAt}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.role}
      </p>
    </div>
  );
};

export default DashboardUserCard;
