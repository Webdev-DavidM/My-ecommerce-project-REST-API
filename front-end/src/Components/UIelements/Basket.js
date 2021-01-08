import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../NavBar.module.css';

export default class Basket extends Component {
  render() {
    return (
      <>
        <div
          className={styles.cartdesktop}
          style={{ width: '5rem', height: '2rem', color: '#2980b9' }}>
          <Link to='/shopping-basket' color='red'>
            <i
              class='fas fa-shopping-cart'
              style={{ width: '0.9rem', height: '0.9rem' }}>
              {' '}
            </i>
            <span>&#127; £799 &#127;&#127;&#40;2&#41;</span>
          </Link>
        </div>
        <div
          className={styles.cart}
          style={{ width: '1.5rem', height: '1.5rem' }}>
          <Link to='/shopping-basket'>
            <i
              color='#2980b9'
              class='fas fa-shopping-cart'
              style={{ color: '#ecf0f1', width: '100%', height: '100%' }}></i>
          </Link>
        </div>
      </>
    );
  }
}
