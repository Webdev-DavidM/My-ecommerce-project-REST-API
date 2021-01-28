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
    localError: '',
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fieldsCompleted = () => {
    // if (this.state.email || this.state.password === '') {
    //   return this.setState({ error: 'Please complete all fields' });
    // }

    this.props.submitSignIn(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className={styles.signincontainer}>
        <div className={styles.signin}>
          <h1>Sign in</h1>
          <p>Email address</p>
          <input
            onChange={(e) => this.onInputChange(e)}
            name='email'
            type='text'
            value={this.state.email}
          />
          <br />
          <p>Password </p>
          <input
            onChange={(e) => this.onInputChange(e)}
            name='password'
            value={this.state.password}
          />
          <br />
          <button onClick={() => this.fieldsCompleted()}>
            Sign in securely
          </button>
          {this.props.reduxError && (
            <div className={styles.error}>{this.props.reduxError}</div>
          )}
        </div>

        <div className={styles.signup}>
          <h1>New customer</h1>
          <p>Email address</p>
          <input type='text' />
          <br />
          <button onClick={() => this.props.submitSignIn}>
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
  return { reduxError: state.user.error, loading: state.user.loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
