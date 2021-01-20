import styles from './Signin.module.css';
import React, { Component } from 'react';

export default class SignIn extends Component {
  render() {
    return (
      <div className={styles.signincontainer}>
        <div className={styles.signin}>
          <h1>Sign in</h1>
          <p>Email address</p>
          <input type='text' />
          <br />
          <p>Password </p>
          <input type='text' />
          <br />
          <button>Sign in securely</button>
        </div>

        <div className={styles.signup}>
          <h1>New customer</h1>
          <p>Email address</p>
          <input type='text' />
          <br />
          <button>Sign in securely</button>
        </div>
      </div>
    );
  }
}
