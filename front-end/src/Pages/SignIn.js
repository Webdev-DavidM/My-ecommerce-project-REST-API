/* NPM package imports */

import styles from './Signin.module.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Action creators imports */

import { userSignIn } from '../Actions/users.js';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    existingUserPassword: '',
    localErrorSignIn: null,
    localErrorSignUp: null,
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fieldsCompleted = (userType) => {
    console.log(userType);
    if (userType === 'signin') {
      if (this.state.email && this.state.password !== '') {
        this.setState({ localErrorSignIn: null });
        this.props.submitSignIn(this.state.email, this.state.password);
      } else {
        return this.setState({
          localErrorSignIn: 'Please complete all fields',
        });
      }
    }
    if (userType === 'signup') {
      if (this.state.existingUserPassword !== '') {
        this.props.history.push(`/sign-up/${this.state.existingUserPassword}`);
      } else {
        return this.setState({
          localErrorSignUp: 'Please complete all fields',
        });
      }
    }
  };

  render() {
    console.log(this.props.serverError);
    let { serverError, isSignedIn } = this.props;
    if (isSignedIn) {
      this.props.history.goBack();
    }
    let {
      password,
      email,
      existingUserPassword,
      localErrorSignIn,
      localErrorSignUp,
    } = this.state;
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
          {localErrorSignIn && (
            <div className={styles.error}>{localErrorSignIn}</div>
          )}
          {serverError && <div className={styles.error}>{serverError}</div>}
        </div>

        <div className={styles.signup}>
          <h1>New customer</h1>
          <p>Email address</p>
          <input
            type='text'
            onChange={(e) => this.onInputChange(e)}
            name='existingUserPassword'
            value={existingUserPassword}
          />
          <br />
          <button onClick={() => this.fieldsCompleted('signup')}>
            Sign in securely
          </button>
          {localErrorSignUp && (
            <div className={styles.error}>{localErrorSignUp}</div>
          )}
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
