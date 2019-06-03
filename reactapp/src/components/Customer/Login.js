import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleLogin, message, forgotPasswordLink, loginLink }) => {
  const handleSubmit = e => {
    e.preventDefault();
    handleLogin(username.value, password.value);
  };

  let username, password;

  return (
    <div className={'block block-customer-login'}>
      <div
        className="block-content"
        aria-labelledby="block-customer-login-heading"
      >
        {message.text !== '' && (
          <div className={`message ${message.type}`}>
            <p>{message.text}</p>
          </div>
        )}
        <form
          className="form form-login"
          onSubmit={handleSubmit}
          action={loginLink}
          method={'post'}
        >
          <fieldset className="fieldset login">
            <div className="field note">
              If you have an account, sign in with your email address.
            </div>
            <div className="field email required">
              <label className="label" htmlFor="email">
                <span>Email</span>
              </label>
              <div className="control">
                <input
                  name="login[username]"
                  defaultValue={''}
                  id="email"
                  type="email"
                  className="input-text"
                  title="Email"
                  aria-required="true"
                  ref={ref => (username = ref)}
                />
              </div>
            </div>
            <div className="field password required">
              <label htmlFor="pass" className="label">
                <span>Password</span>
              </label>
              <div className="control">
                <input
                  name="login[password]"
                  defaultValue={''}
                  type="password"
                  className="input-text"
                  id="pass"
                  title="Password"
                  aria-required="true"
                  ref={ref => (password = ref)}
                />
              </div>
            </div>

            <div className="actions-toolbar">
              <div className="primary">
                <button
                  type="submit"
                  className="action login primary"
                  name="send"
                  id="send2"
                >
                  <span>Sign In</span>
                </button>
              </div>
              <div className="secondary">
                <a className="action remind" href={forgotPasswordLink}>
                  <span>Forgot Your Password?</span>
                </a>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  loginLink: PropTypes.string.isRequired,
  forgottenPasswordLink: PropTypes.string.isRequired
};

Login.defaultProps = {
  handleLogin: () => {
    console.log('handleLogin is not defined');
  },
  message: { type: '', text: '' },
  loginLink: '',
  forgottenPasswordLink: ''
};

export default Login;
