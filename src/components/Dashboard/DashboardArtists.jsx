import React, { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { getAllArtists } from "../../api";
import { actionType } from "../../context/reducer";
import ArtistContainer from "../Container/ArtistContainer";

const DashboardArtists = () => {
  const [{ allArtists }, dispatch] = useStateValue();
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
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  );
};

export default DashboardArtists;
