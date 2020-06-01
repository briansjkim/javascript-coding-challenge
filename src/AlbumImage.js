import React from 'react';
import Albums from './Albums.js';
import './App.css';

const AlbumImage = ({ albums }) => {
  return (
    <div className="Album-image">
      <div className="Photo-details">
        {albums.map((album, idx) =>
          <Albums album={album} key={idx} />
        )}
      </div>
    </div>
  )
}

export default AlbumImage
