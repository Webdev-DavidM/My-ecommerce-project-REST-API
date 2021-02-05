/* NPM packages */

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */

import styles from './ShoppingBasket.module.css';

/* Components */

import CheckoutItem from '../Components/UIelements/CheckoutItem';

/* Action creators */

import { addToBasket } from '../Actions/products.js';

class ShoppingBasket extends Component {
  componentDidMount = () => {
    let { basket, addBasket } = this.props;
    console.log(basket);
    // here we check if there is something in the basket which means the user has come
    // from the product screen, if so then add to local storage
    if (basket.length !== 0) {
      basket.map((item, index) => {
        return localStorage.setItem(`item${index}`, JSON.stringify(item));
      });
    }

    // here we check if the page has been refreshed and there is nothing in the basket, if there
    // is an item in local storage then dispatch it to be added to basket in redux so it can populate this screen
    let localStorageItems = Object.keys(localStorage);
    let itemsFromLocalStorage = localStorageItems.map((item) => {
      return JSON.parse(localStorage.getItem(`${item}`));
    });

    if (basket.length === 0 && itemsFromLocalStorage)
      // Here I will store the basket in local storage and reload if the user refreshes the page
      itemsFromLocalStorage.map((item) => addBasket(item));
    console.log('items from storage', itemsFromLocalStorage);
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

const mapDispatchToProps = (dispatch) => {
  return {
    addBasket: (item) => dispatch(addToBasket(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingBasket);
