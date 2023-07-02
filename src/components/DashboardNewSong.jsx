import React, { useEffect, useState } from "react";
import FilterButtons from "./FilterButtons";
import { actionType } from "../context/reducer";
import {
  filterByLanguages,
  filterByCategories,
} from "../utils/supportFunctions";
import { getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { useStateValue } from "../context/StateProvider";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [{ allArtists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.albums,
        });
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4">
      <input
        type="text"
        placeholder="Type your song name..."
        className="w-full p-3 rounded-2xl text-base font-semibold text-textColor outline-none shadow-sm"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={allArtists} flag={"Artists"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguages} flag={"Languages"} />
        <FilterButtons filterData={filterByCategories} flag={"Categories"} />
      </div>
    </div>
  );
};

export default DashboardNewSong;
