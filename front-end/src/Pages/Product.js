import { StylesProvider } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './Product.module.css';
import ProductImageCarousel from '../Components/UIelements/ProductImageCarousel';

export default class Product extends Component {
  state = {
    size: '',
    quantity: 0,
    AddToBasket: false,
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.product}>
        <p className={styles.title}>Vitus road bike</p>
        <span>reviews</span>
        <hr></hr>
        <ProductImageCarousel />
        <p className={styles.price}>£999.99</p>
        <p>Colour: Black Quartz</p>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Select a size
              <select>
                <option value='small'>small</option>
                <option value='medium'>medium</option>
                <option selected value='large'>
                  large
                </option>
              </select>
            </label>
            <input type='submit' value='submit' />
          </form>
        </div>
      </div>
    );
  }
}
