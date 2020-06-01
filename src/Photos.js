import React from 'react';
import './App.css';

const Photos = ({ photos, album, loading }) => {
  if (loading) {
    return 'Loading...';
  }

  return (
    <div>
      {photos.map((photo, idx) =>
        <div className="Photo-details" key={idx}>
          <img src={photo.url} alt="album-cover"></img>
          <h4>{photo.title}</h4>
          <p>{album.title}</p>
        </div>
      )}
    </div>
  )
}

export default Photos;
