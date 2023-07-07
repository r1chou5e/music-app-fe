import React, { useEffect, useState } from "react";
import FilterButtons from "./FilterButtons";
import { actionType } from "../context/reducer";
import {
  filterByLanguages,
  filterByCategories,
} from "../utils/supportFunctions";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
  saveSong,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import FileLoader from "./FileLoader";
import FileUploader from "./FileUploader";
import { storage } from "../config/firebase.config";
import { ref, deleteObject } from "firebase/storage";
import { MdDelete } from "react-icons/md";
import DisabledButton from "./DisabledButton";
import { motion } from "framer-motion";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");

  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [
    {
      allArtists,
      allAlbums,
      allSongs,
      artistFilter,
      albumFilter,
      languageFilter,
      filterTerm,
      alertType,
    },
    dispatch,
  ] = useStateValue();

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

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAlbumUploading(true);
      setIsArtistUploading(true);
    } else {
      setIsAudioLoading(true);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
      setSongImageCover(null);
      setIsImageLoading(false);
      setAlbumImageCover(null);
      setArtistImageCover(null);
      setAudioImageCover(null);
      setIsAudioLoading(false);
      setIsAlbumUploading(false);
      setIsArtistUploading(false);
    });
    dispatch({
      type: actionType.SET_ALERT_TYPE,
      alertType: "success",
    });
    setInterval(() => {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: null,
      });
    }, 4000);
  };

  const saveSong = () => {
    if (!songImageCover || !audioImageCover) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageUrl: songImageCover,
        songUrl: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };
      saveNewSong(data).then((res) => {
        getAllSongs().then((song) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.songs,
          });
        });
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);

      setSongName(null);
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setSongImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      setIsArtistUploading(true);
      const data = {
        name: artistName,
        imageUrl: artistImageCover,
        twitter: `@${twitter}`,
        instagram: `@${instagram}`,
      };
      saveNewArtist(data).then((res) => {
        getAllArtists().then((artist) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artists,
          });
        });
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);

      setIsArtistUploading(false);
      setArtistImageCover(null);
      setArtistName("");
      setInstagram("");
      setTwitter("");
    }
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } else {
      setIsAlbumUploading(true);
      const data = {
        name: albumName,
        imageUrl: albumImageCover,
      };

      saveNewAlbum(data).then(() => {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.albums,
          });
        });
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);

      setIsAlbumUploading(false);
      setAlbumImageCover(null);
      setAlbumName("");
    }
  };

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

      {/* Image cover uploader */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={songImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio uploader */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio src={audioImageCover} controls></audio>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(audioImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-center w-60 p-4">
        {isImageLoading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 rounded-md w-full text-white bg-red-600 hover:shadow-lg"
            onClick={saveSong}
          >
            Save song
          </motion.button>
        )}
      </div>

      {/* Artist image uploader */}
      <p className="text-xl font-semibold text-headingColor">Artist Details</p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadingProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={artistImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Artist name */}
      <input
        type="text"
        placeholder="Artist name..."
        className="w-full p-3 rounded-2xl text-base font-semibold text-textColor outline-none shadow-sm"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />

      {/* Twitter */}
      <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">
          www.twitter.com/
        </p>
        <input
          type="text"
          placeholder="your_twitter_id"
          className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>

      {/* Instagram */}
      <div className="flex items-center rounded-md p-3 border border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">
          www.instagram.com/
        </p>
        <input
          type="text"
          placeholder="your_instagram_id"
          className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>

      {/* Save Artist */}
      <div className="flex items-center justify-center w-60 p-4">
        {isArtistUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 rounded-md w-full text-white bg-red-600 hover:shadow-lg"
            onClick={saveArtist}
          >
            Save artist
          </motion.button>
        )}
      </div>

      {/* Album info */}
      <p className="text-xl font-semibold text-headingColor">Album Details</p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setAlbumImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={albumImageCover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteFileObject(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Album name */}
      <input
        type="text"
        placeholder="Album name..."
        className="w-full p-3 rounded-2xl text-base font-semibold text-textColor outline-none shadow-sm"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />

      {/* Save Album */}
      <div className="flex items-center justify-center w-60 p-4">
        {isAlbumUploading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 rounded-md w-full text-white bg-red-600 hover:shadow-lg"
            onClick={saveAlbum}
          >
            Save album
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default DashboardNewSong;
