import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
  audioRef,
  songs,
  setSongs,
  isPlaying,
  setCurrentSong,
  currentSong,
  libraryOpen,
}) {
  return (
    <div className={`library ${libraryOpen ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
            song={song}
            key={song.id}
            isPlaying={isPlaying}
            currentSong={currentSong}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
