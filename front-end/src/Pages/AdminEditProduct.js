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

  componentDidMount = () => {
    // here i will use the id from the url to get the product from redux and
    // populate the placeholders
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
          <h2>EDIT PRODUCT</h2>
          <div className={styles.editformcontainer}>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  placeholder='david mulholland'
                  type='text'
                  name='name'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Price
                <input
                  type='text'
                  placeholder='£1999'
                  name='price'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Image( i will to set up multer here)
                <input
                  type='text'
                  placeholder='/images/madeup.jpg'
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
                  placeholder='vitus'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Count in inStock
                <input
                  type='text'
                  name='inStock'
                  placeholder='2'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Category
                <input
                  type='text'
                  name='category'
                  placeholder='road bikes'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Description
                <input
                  type='text'
                  name='description'
                  placeholder='great road bike'
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
