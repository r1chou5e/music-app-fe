import React from "react";

const DashboardUserCard = ({ data, index }) => {
  console.log(data, index);
  return (
    <div>
      <p>{data.name}</p>
      <p>{data.email}</p>
    </div>
  );
};

export default DashboardUserCard;
