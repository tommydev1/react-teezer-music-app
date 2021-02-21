import Song from "./components/Song";
import Player from "./components/Player";
import "./styles/app.scss";
import data from "./data";
import { useRef, useState } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //STATE
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationP: 0,
  });
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  //AUDIO REFERENCE
  const audioRef = useRef(null);
  //HANDLER
  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundCurrent = Math.round(current);
    const roundDuration = Math.round(duration);
    const animationP = Math.round((roundCurrent / roundDuration) * 100);
    setSongInfo({ ...songInfo, currentTime: current, duration, animationP });
  };
  const songEndHandler = async () => {
    await setCurrentSong(
      songs[(songs.indexOf(currentSong) + 1) % songs.length]
    );
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        isPlaying={isPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        currentSong={currentSong}
        libraryOpen={libraryOpen}
      />
      <audio
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
