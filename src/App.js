import React, { useEffect, useState } from 'react';
import Users from './Users.js';
import './App.css';

const App = () => {
  const [allUsers, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const callAPI = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const fetchedUsers = await users.json();
    return fetchedUsers;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const resUsers = await callAPI();
        setUsers(resUsers);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  const handleChange = (val) => {
    setSearchedUser(val);
  }

  const submitSearch = () => {
    async function filterUser() {
      try {
        const res = await callAPI();
        let filteredUsers = [];
        for (let i = 0; i < res.length; i++) {
          let users = res[i];
          let usernames = users.name.toLowerCase();
          if (usernames.includes(searchedUser.toLowerCase())) {
            filteredUsers.push(users);
          }
        }
        if (filteredUsers.length > 0) {
          setUsers(filteredUsers);
          setNoResults(false);
        } else {
          setNoResults(true);
        }
        setSearchedUser('');
      } catch (error) {
        console.log(error);
      }
    }

    filterUser();
  }

  if (loading) {
    return 'Loading...';
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Homepage</h1>
        <div className="Search">
          <input
            className="Search-user"
            type="text"
            placeholder="Search User's Name"
            value={searchedUser}
            onChange={e => handleChange(e.target.value)}
          />
          <input
            className="Submit-search"
            type="submit"
            value="Search"
            onClick={submitSearch}
          />
        </div>
        {noResults ? 'No Results' : <Users allUsers={allUsers} />}
      </header>
    </div>
  );
}

export default App;
