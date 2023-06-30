import React, { useEffect } from "react";
import DashboardCard from "./DashboardCard";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { getAllUsers, getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { NavLink } from "react-router-dom";

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        });
      });
    }

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
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <NavLink to={"/dashboard/users"}>
        <DashboardCard
          icon={<FaUsers className="text-3xl text-white" />}
          name={"Users"}
          count={allUsers?.length > 0 ? allUsers?.length : 0}
        />
      </NavLink>
      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-white" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />
      <DashboardCard
        icon={<RiUserStarFill className="text-3xl text-white" />}
        name={"Artists"}
        count={allArtists?.length > 0 ? allArtists?.length : 0}
      />
      <DashboardCard
        icon={<GiMusicalNotes className="text-3xl text-white" />}
        name={"Albums"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </div>
  );
};

export default DashboardHome;
