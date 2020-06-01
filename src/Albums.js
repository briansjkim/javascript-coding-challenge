import React, { useEffect, useState } from 'react';
import Photos from './Photos.js';
import './App.css';

const Albums = ({ album }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [picsPerPage, setPicsPerPage] = useState(18);
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

  const idxOfLastPic = currentPage * picsPerPage;
  const idxOfFirstPic = idxOfLastPic - picsPerPage;
  const currentPics = photos.slice(idxOfFirstPic, idxOfLastPic);

  return (
    <div className="Album-photos">
      <Photos photos={currentPics} album={album} loading={loading} />
    </div>
  )
}

export default Albums;
