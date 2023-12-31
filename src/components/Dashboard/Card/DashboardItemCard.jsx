import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import {
  deleteAlbum,
  deleteArtist,
  deleteSong,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../../../api";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import { storage } from "../../../config/firebase.config";
import { ref, deleteObject } from "firebase/storage";

const DashboardItemCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [
    { alertType, allArtists, allAlbums, allSongs, songIndex, isSongPlaying },
    dispatch,
  ] = useStateValue();

  const deleteItem = (data) => {
    if (type === "song") {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: false,
      });

      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {});

      deleteSong(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 3000);
          getAllSongs().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.songs,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 3000);
        }
      });
    }

    if (type === "album") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {});

      deleteAlbum(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 3000);
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.albums,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 3000);
        }
      });
    }

    if (type === "artist") {
      const deleteRef = ref(storage, data.imageUrl);
      deleteObject(deleteRef).then(() => {});

      deleteArtist(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 3000);
          getAllArtists().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.artists,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setInterval(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 3000);
        }
      });
    }
  };

  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-5 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={type === "song" && addToContext}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageUrl}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}..`
              : data.artist}
          </span>
        )}
      </p>

      <div className="w-full absolute bottom-2 flex items-center justify-end px-2 gap-2">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-gray-400 drop-shadow-md hover:text-gray-600"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash />
        </motion.i>
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-gray-400 drop-shadow-md hover:text-gray-600"
        >
          <IoPencil />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl text-headingColor font-semibold text-center">
            Are you sure to delete it ?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase rounded-md bg-red-300 hover:bg-red-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteItem(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase rounded-md bg-green-300 hover:bg-green-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardItemCard;
