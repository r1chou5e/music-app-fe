import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PlaylistCard from "./PlaylistCard";
import { actionType } from "../context/reducer";
import { IoClose } from "react-icons/io5";
import WaveForm from "./WaveForm";

const MusicPlayer = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPlaylist, setIsPlaylist] = useState(false);

  const [analyzerData, setAnalyzerData] = useState(null);
  const audioElmRef = useRef(null);
  const audioAnalyzer = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const source = audioCtx.createMediaElementSource(
      audioElmRef.current.audio.current
    );

    source.connect(analyzer);
    source.connect(audioCtx.destination);
    source.onended = () => {
      source.disconnect();
    };

    setAnalyzerData({ analyzer, bufferLength, dataArray });
  };

  useEffect(() => {
    if (analyzerData) {
      console.log(analyzerData.dataArray);
    }
  }, [analyzerData]);

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
      <div className={`w-full gap-3 p-4 flex relative py-5`}>
        <img
          src={allSongs[songIndex]?.imageUrl}
          className="w-40 h-40 object-cover rounded-md"
        />

        <div className="flex flex-col items-start w-[150px]">
          <p className="text-2xl text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{" "}
          </p>
          <p className="text-textColor">
            {"Ca sĩ: "}
            <span className="text-textColor font-semibold">
              {allSongs[songIndex]?.artist}{" "}
            </span>
          </p>
          <p className="text-textColor">
            {"Album: "}
            <span className="text-textColor font-semibold">
              {allSongs[songIndex]?.album}{" "}
            </span>
          </p>
          <p className="text-textColor">
            {"Thể loại: "}
            <span className="text-textColor font-semibold">
              {allSongs[songIndex]?.category}{" "}
            </span>
          </p>

          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlaylist(!isPlaylist)}
          >
            <RiPlayListFill />
          </motion.i>
        </div>

        <div className="flex-1 justify-end items-end flex-col">
          {analyzerData && <WaveForm analyzerData={analyzerData} />}
          <AudioPlayer
            src={allSongs[songIndex]?.songUrl}
            onPlay={() => {
              console.log("is playing");
              audioAnalyzer();
            }}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            onEnded={() => nextTrack()}
            ref={audioElmRef}
            crossOrigin={"anonymous"}
          />
        </div>

        {isPlaylist && <PlaylistCard />}

        <IoClose onClick={closePlayer} />
      </div>
    </div>
  );
};

export default MusicPlayer;
