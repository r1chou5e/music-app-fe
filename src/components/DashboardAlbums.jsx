import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums } from "../api";
import { actionType } from "../context/reducer";
import AlbumContainer from "./AlbumContainer";

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
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
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <AlbumContainer data={allAlbums} />
      </div>
    </div>
  );
};

export default DashboardAlbums;
