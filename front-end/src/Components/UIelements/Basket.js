/* NPM packages */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* CSS */

import styles from '../NavBar.module.css';

class Basket extends Component {
  render() {
    let { basketValue, basketNumber } = this.props;
    let total = basketValue().Total;
    let basketDetails = basketNumber.length !== 0 && (
      <span>
        &#127;{total}&#127;&#127;&#40;{basketNumber}&#41;
      </span>
    );

    return (
      <>
        <div
          className={styles.cartdesktop}
          style={{ width: '5rem', height: '2rem', color: '#2980b9' }}>
          <Link to='/shopping-basket' color='red'>
            <i
              className='fas fa-shopping-cart'
              style={{ width: '0.9rem', height: '0.9rem' }}>
              {' '}
            </i>
            {basketDetails}
          </Link>
        </div>
        <div
          className={styles.cart}
          style={{ width: '1.5rem', height: '1.5rem' }}>
          <Link to='/shopping-basket'>
            <i
              color='#2980b9'
              className='fas fa-shopping-cart'
              style={{ width: '100%', height: '100%' }}></i>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketNumber: state.products.basket.length,
    basketValue: () => {
      let Total = 0;
      if (state.products.basket.length !== 0) {
        Total = state.products.basket
          .map((product) => {
            return product.price * product.quantity;
          })
          .reduce((total, itemTotal) => {
            return total + itemTotal;
          });
      }
      return { Total };
    },
  };
};

export default connect(mapStateToProps)(Basket);
