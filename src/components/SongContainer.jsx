import React from "react";
import DashboardSongCard from "./DashboardSongCard";

const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song, index) => (
          <DashboardSongCard
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
