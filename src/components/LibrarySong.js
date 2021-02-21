import React from "react";

function LibrarySong({
  audioRef,
  song,
  songs,
  setSongs,
  isPlaying,
  setCurrentSong,
}) {
  const selectHandler = async () => {
    //Set Selected Song
    await setCurrentSong(song);
    //Change Active State
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
    //Check if Playing, Wait for loading
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={selectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-desc">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
