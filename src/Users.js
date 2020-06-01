import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Users = ({ allUsers }) => {
  return (
    <div className="Users">
      {allUsers.map((user, idx) =>
        <Link key={idx} to={{
          pathname: '/photos',
          state: { user: user },
        }}>
          <div className="User">
            <div className="User-name">
              {user.name}
            </div>
            <div className="User-company">
              {user.company.name}
              <br />
              {user.company.catchPhrase}
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Users;
