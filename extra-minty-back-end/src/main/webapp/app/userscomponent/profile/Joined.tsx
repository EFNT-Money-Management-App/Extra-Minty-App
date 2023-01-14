import React from 'react';

const Joined = ({ currentUser }) => {
  return (
    <div>
      <p>Join Date: {currentUser.createdDate.toDateString()}</p>
    </div>
  );
};

export default Joined