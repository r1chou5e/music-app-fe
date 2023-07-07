import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongContainer from "./SongContainer";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
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
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink
          to={"/dashboard/new-song"}
          className="flex items-center justify-center px-4 py-3 rounded-2xl bg-white hover:shadow-md cursor-pointer"
        >
          <IoAdd />
        </NavLink>

        <input
          type="text"
          className={`w-52 px-4 py-2 ${
            isFocus ? "shadow-md" : ""
          } rounded-2xl bg-white outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          placeholder="Search here..."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
        </i>
      </div>

      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count:{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>

          <SongContainer data={allSongs}/>

      </div>
    </div>
  );
};

export default DashboardSongs;
