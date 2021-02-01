/* NPM packages */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* css */

import styles from './SignUp.module.css';

/* Action creators */
import { userSignUp } from '../Actions/users.js';

class SignUp extends Component {
  state = {
    email: '',
    confirmEmail: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    error: null,
  };

  componentDidMount = () => {
    let email = this.props.match.params.email;
    this.setState({ email });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    console.log(this.props);
    e.preventDefault();

    let {
      email,
      confirmEmail,
      firstName,
      lastName,
      password,
      address,
    } = this.state;

    if (
      email &&
      password &&
      firstName &&
      lastName &&
      address &&
      confirmEmail !== ''
    ) {
      this.setState({ error: null });
      let data = { email, address, password, lastName, firstName };
      this.props.signUserUp(data);
    } else {
      return this.setState({
        error: 'Please complete all fields',
      });
    }
  }

  render() {
    let { error } = this.state;
    let { isSignedIn, serverError } = this.props;
    if (isSignedIn) {
      this.props.history.push('/');
    }

    return (
      <div className={styles.signupcontainer}>
        <h2>New customer</h2>
        <span>
          Already have an account?<Link to={'/sign-in'}>&nbsp;Sign in</Link>{' '}
        </span>
        <div className={styles.formcontainer}>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>
              First name
              <input
                type='text'
                name='firstName'
                value={this.state.firstName}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Last name
              <input
                type='text'
                name='lastName'
                value={this.state.lastName}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Address
              <textarea
                type='text'
                name='address'
                value={this.state.address}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Email
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Please confirm your email address
              <input
                type='text'
                name='confirmEmail'
                value={this.state.confirmEmail}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Create a password
              <input
                type='text'
                name='password'
                value={this.state.password}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <input type='submit' value='Submit' />
          </form>
          {error && <div className={styles.error}>{error}</div>}
          {serverError && <div className={styles.error}>{serverError}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    serverError: state.user.error,
    isSignedIn: state.user.signedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUserUp: (signUpData) => dispatch(userSignUp(signUpData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
