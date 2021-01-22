import React, { Component } from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
  state = {
    email: '',
    confirmEmail: '',
    password: '',
    firstName: '',
    lastName: '',
    Marketing: false,
    errors: [],
  };

  handleChange(e) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.signupcontainer}>
        <h2>New customer</h2>
        <span>
          Already have an account?<Link to={'/sign-in'}>&nbsp;Sign in</Link>{' '}
        </span>
        <div className={styles.formcontainer}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type='text'
                name='name'
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Email
              <input
                type='text'
                name='email'
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Please confirm your email address
              <input
                type='text'
                name='confirmEmail'
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Create a password
              <input
                type='text'
                name='password'
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              First name
              <input
                type='text'
                name='firstName'
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              Last name
              <input
                type='text'
                name='lastName'
                value={this.state.value}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    );
  }
}
