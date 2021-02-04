/* NPM packages */

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */

import styles from './ShoppingBasket.module.css';

/* Components */

import CheckoutItem from '../Components/UIelements/CheckoutItem';

/* Action creators */

class ShoppingBasket extends Component {
  componentDidMount = () => {
    // I will get the items from redux here and put in state
  };
  render() {
    let { goBack, push } = this.props.history;
    let { basket, basketTotal } = this.props;
    let total = basketTotal();
    return (
      <div className={styles.shoppingbasket}>
        <h2>Your Shopping Basket</h2>
        <div className={styles.buttoncontainer}>
          {' '}
          <button className={styles.buttonshopping} onClick={() => goBack()}>
            Continue Shopping
          </button>
          <button
            disabled={basket.length === 0}
            onClick={() => push('/check-out')}
            className={styles.buttoncheckout}>
            Proceed to checkout
          </button>
        </div>

        {basket.map((item, index) => {
          return (
            <>
              <CheckoutItem details={item} key={index} id={index} />
              <hr></hr>
            </>
          );
        })}
        {basket.length === 0 && (
          <h2 style={{ color: '#e74c3c' }}>Basket empty </h2>
        )}
        <h1
          style={{ textAlign: 'right', marginRight: '4rem', color: '#27ae60' }}>
          Total price: £{total.Total}
        </h1>
        <button
          disabled={basket.length === 0}
          className={styles.buttoncheckout}
          onClick={() => push('/check-out')}>
          Proceed to checkout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basket: state.products.basket,
    basketTotal: () => {
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

export default connect(mapStateToProps, null)(ShoppingBasket);
