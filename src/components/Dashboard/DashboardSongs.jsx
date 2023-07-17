import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../../context/StateProvider";
import { getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";
import SongContainer from "../Container/SongContainer";
import SearchBar from "../SearchBar/SearchBar";

const DashboardSongs = () => {
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <SearchBar type={"song"} />

      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count:{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>

        <SongContainer data={allSongs} />
      </div>
    </div>
  );
};

export default DashboardSongs;
