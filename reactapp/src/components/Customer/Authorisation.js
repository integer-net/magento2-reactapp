import React from 'react';
import PropTypes from 'prop-types';
import { Login, Logout } from './index';
import { reloadInvalidatedSections } from '../../util/magento/customerData';
import config from '../../config';

class Authorisation extends React.Component {
  state = {
    message: {
      type: '',
      text: ''
    }
  };

  handleLogin = async (username, password) => {
    const { loginLink } = config;

    await window
      .fetch(loginLink, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
          // persistent_remember_me: '0', // 0 || 1
          context: 'checkout'
        })
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(response => {
        if (
          response.errors === true ||
          (response.hasOwnProperty('ok') && response.ok === false)
        ) {
          response.error = true;

          this.setState({
            message: { text: response.message, type: 'error' }
          });

          return response;
        } else {
          this.setState({
            message: { text: response.message, type: 'success' }
          });
          reloadInvalidatedSections();
          return response;
        }
      })
      .catch(error => {
        this.setState({
          message: { text: error.message, type: 'error' }
        });

        console.log('login action failed:', error);
      });
  };

  render() {
    const {
      props: {
        customer: { isLoggedIn },
        isLoading
      },
      state: { message },
      handleLogin
    } = this;

    const { loginLink, forgotPasswordLink, logoutLink } = config;

    return (
      <div className={'login-container'}>
        {isLoading && 'Loading...'}
        {!isLoading && isLoggedIn && <Logout logoutLink={logoutLink} />}
        {!isLoading && !isLoggedIn && (
          <Login
            handleLogin={handleLogin}
            message={message}
            forgotPasswordLink={forgotPasswordLink}
            loginLink={loginLink}
          />
        )}
      </div>
    );
  }
}

Authorisation.propTypes = {
  customer: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

Authorisation.defaultValues = {
  customer: {},
  isLoading: true
};

export default Authorisation;
