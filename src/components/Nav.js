import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Nav({ setLibraryOpen, libraryOpen }) {
  return (
    <nav>
      <h1>Teezer</h1>
      <button onClick={() => setLibraryOpen(!libraryOpen)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;
