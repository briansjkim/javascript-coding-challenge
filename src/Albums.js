import React, { useEffect, useState } from 'react';
import Photos from './Photos.js';
import './App.css';

const Albums = ({ album }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const albumId = album.userId;

  useEffect(() => {
    async function fetchedPhotos() {
      try {
        setLoading(true);
        const allPhotos = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        const resPhotos = await allPhotos.json();
        setPhotos(resPhotos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchedPhotos();
  }, [albumId]);

  return (
    <div className="Album-photos">
      <Photos photos={photos} album={album} loading={loading} />
    </div>
  )
}

export default Albums;
