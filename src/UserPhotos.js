import React, { useEffect, useState } from 'react';
import AlbumImage from './AlbumImage.js';
import { useHistory } from 'react-router-dom';

const UserPhotos = () => {
  const [albums, setAlbums] = useState([]);
  var [loading, setLoading] = useState(true);
  const history = useHistory();
  const userId = history.location.state.user.id;
  const userName = history.location.state.user.name;

  // useEffect should only run once if an array of variables are passed in as its second argument
  // must add props and state that change over time and are used by the effect
  // otherwise, code will reference stale values from previous renders
  useEffect(() => {
    async function fetchData() {
      try {
        const allAlbums = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
        const resAlbums = await allAlbums.json();
        setAlbums(resAlbums);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return 'Loading...';
  }

  return (
    <div className="User-photos">
      <div className="User-header">
        <h1>{userName + "'s Photos"}</h1>
      </div>
      <div className="User-albums">
        <AlbumImage albums={albums} />
      </div>
    </div>
  )
}

export default UserPhotos;
