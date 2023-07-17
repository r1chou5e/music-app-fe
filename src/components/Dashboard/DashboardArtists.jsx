import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { getAllArtists } from "../../api";
import { actionType } from "../../context/reducer";
import ArtistContainer from "../Container/ArtistContainer";
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AiOutlineClear } from "react-icons/ai";
import SearchBar from "../SearchBar/SearchBar";

const DashboardArtists = () => {
  const [{ allArtists }, dispatch] = useStateValue();
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <SearchBar type={"artist"} />
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count:{" "}
            </span>
            {allArtists?.length}
          </p>
        </div>
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  );
};

export default DashboardArtists;
