import React from "react";
import DashboardItemCard from "../Dashboard/Card/DashboardItemCard";

const AlbumContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, index) => (
          <DashboardItemCard
            key={song._id}
            data={song}
            index={index}
            type="album"
          />
        ))}
    </div>
  );
};

export default AlbumContainer;
