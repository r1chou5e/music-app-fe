import React from "react";
import DashboardItemCard from "../Dashboard/Card/DashboardItemCard";

const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-8 items-center justify-start">
      {data &&
        data.map((song, index) => (
          <DashboardItemCard
            key={song._id}
            data={song}
            index={index}
            type="song"
          />
        ))}
    </div>
  );
};

export default SongContainer;
