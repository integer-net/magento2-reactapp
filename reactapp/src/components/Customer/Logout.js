import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ logoutLink }) => {
  return (
    <div>
      <a href={logoutLink}>Logout</a>
    </div>
  );
};

Logout.propTypes = {
  logoutLink: PropTypes.string.isRequired
};

Logout.defaultValues = {
  logoutLink: ''
};

export default Logout;
