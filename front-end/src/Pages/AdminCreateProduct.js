/* NPM packages */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* CSS */

import styles from './AdminEditProduct.module.css';

export default class SignUp extends Component {
  state = {
    name: '',
    price: '',
    image: '',
    brand: '',
    inStock: '',
    category: false,
    description: [],
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className={styles.editproductcontainer}>
          <h4>
            <Link to='/admin'>Go back</Link>{' '}
          </h4>
          <h2>CREATE PRODUCT</h2>
          <div className={styles.editformcontainer}>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  name='name'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Price
                <input
                  type='text'
                  name='price'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Image( i will to set up multer here)
                <input
                  type='text'
                  name='image'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Brand
                <input
                  type='text'
                  name='brand'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Count in inStock
                <input
                  type='text'
                  name='inStock'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Category
                <input
                  type='text'
                  name='category'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Description
                <input
                  type='text'
                  name='description'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <input type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </>
    );
  }
}
