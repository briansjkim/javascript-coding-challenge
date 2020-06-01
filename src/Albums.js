import React, { useEffect, useState } from 'react';
import Photos from './Photos.js';
import Pagination from './Pagination.js';
import './App.css';

const Albums = ({ album }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [picsPerPage] = useState(18);
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
  }, []);

  const idxOfLastPic = currentPage * picsPerPage;
  const idxOfFirstPic = idxOfLastPic - picsPerPage;
  const currentPics = photos.slice(idxOfFirstPic, idxOfLastPic);

  // Changing pages
  // pageNumber comes from Paginate component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Album-photos">
      <Photos
        photos={currentPics}
        album={album}
        loading={loading}
      />
      <Pagination
        picsPerPage={picsPerPage}
        totalPics={photos.length}
        paginate={paginate}
      />
    </div>
  )
}

export default Albums;
