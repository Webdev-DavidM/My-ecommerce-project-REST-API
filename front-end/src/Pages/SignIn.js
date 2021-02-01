/* NPM package imports */

import styles from './Signin.module.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* UI imports */

import { CircularProgress } from '@material-ui/core';

/* Action creators imports */

import { userSignIn } from '../Actions/users.js';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    existingUserPassword: '',
    localError: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fieldsCompleted = (userType) => {
    if (this.state.email && this.state.password !== '') {
      this.setState({ localError: null });
      this.props.submitSignIn(this.state.email, this.state.password);
    } else {
      return this.setState({ localError: 'Please complete all fields' });
    }
  };

  render() {
    console.log(this.props.serverError);
    let { localError, serverError, isSignedIn } = this.props;
    if (isSignedIn) {
      this.props.history.push('/');
    }
    let { password, email } = this.state;
    return (
      <div className={styles.signincontainer}>
        <div className={styles.signin}>
          <h1>Sign in</h1>
          <p>Email address</p>
          <input
            onChange={(e) => this.onInputChange(e)}
            name='email'
            type='text'
            value={email}
          />
          <br />
          <p>Password </p>
          <input
            onChange={(e) => this.onInputChange(e)}
            name='password'
            value={password}
          />
          <br />
          <button onClick={() => this.fieldsCompleted('signin')}>
            Sign in securely
          </button>
          {localError && <div className={styles.error}>{localError}</div>}
          {serverError && <div className={styles.error}>{serverError}</div>}
        </div>

        <div className={styles.signup}>
          <h1>New customer</h1>
          <p>Email address</p>
          <input
            type='text'
            onChange={(e) => this.onInputChange(e)}
            name='existingUserPassword'
            value={this.state.existingUserPassword}
          />
          <br />
          <button onClick={() => this.fieldsCompleted('signup')}>
            Sign in securely
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignIn: (email, password) => {
      dispatch(userSignIn(email, password));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    serverError: state.user.error,
    loading: state.user.loading,
    isSignedIn: state.user.signedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
