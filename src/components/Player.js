import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  audioRef,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) {
  //HANDLER
  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const skipHandler = async (dir) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    switch (dir) {
      case "forward":
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibSong(songs[(currentIndex + 1) % songs.length]);
        break;
      case "back":
        if (currentIndex === 0) {
          await setCurrentSong(songs[songs.length - 1]);
          activeLibSong(songs[songs.length - 1]);
          if (isPlaying) audioRef.current.play();
        } else {
          await setCurrentSong(songs[currentIndex - 1]);
          activeLibSong(songs[currentIndex - 1]);
        }
        break;
    }
    if (isPlaying) audioRef.current.play();
  };

  const activeLibSong = (prevNext) => {
    //Change Active State
    const allSongs = songs.map((s) => {
      if (s.id === prevNext.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    console.log(prevNext);
    setSongs(allSongs);
  };

  //CONVERT SEC IN MIN:SEC
  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  //Track Animation
  const trackAnim = {
    transform: `translateX(${songInfo.animationP}%)`,
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
}

export default Player;
