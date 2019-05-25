import React from 'react';
import PropTypes from 'prop-types';

const Welcome = props => {
  const {
    customer,
    customer: { firstname, isLoggedIn },
    isLoading
  } = props;

  const welcomeMessage =
    (isLoading && 'loading...') ||
    (!Object.keys(customer).length && 'Could not load data...') ||
    `Welcome ${isLoggedIn ? firstname : 'Unknown Traveler'}`;

  return <div className="customer-welcome">{welcomeMessage}</div>;
};

Welcome.propTypes = {
  customer: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

Welcome.defaultValues = {
  customer: {},
  isLoading: true
};

export default Welcome;
