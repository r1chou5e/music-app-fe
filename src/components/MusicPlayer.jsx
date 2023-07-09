import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PlaylistCard from "./PlaylistCard";
import { actionType } from "../context/reducer";
import { IoClose } from "react-icons/io5";

const MusicPlayer = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPlaylist, setIsPlaylist] = useState(false);
  const nextTrack = () => {
    if (songIndex === allSongs.length - 1) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    }
  };
  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: allSongs.length - 1,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    }
  };

  const closePlayer = () => {
    dispatch({
      type: actionType.SET_IS_SONG_PLAYING,
      isSongPlaying: false,
    });
  };
  return (
    <div className="w-full flex items-center gap-3">
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img
          src={allSongs[songIndex]?.imageUrl}
          className="w-40 h-20 object-cover rounded-md"
        />

        <div className="flex flex-col items-start">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{" "}
            <span className="text-base">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({allSongs[songIndex]?.category})
            </span>
          </p>

          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlaylist(!isPlaylist)}
          >
            <RiPlayListFill />
          </motion.i>
        </div>

        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            onEnded={() => nextTrack()}
          />
        </div>

        {isPlaylist && <PlaylistCard />}

        <IoClose onClick={closePlayer} />
      </div>
    </div>
  );
};

export default MusicPlayer;
