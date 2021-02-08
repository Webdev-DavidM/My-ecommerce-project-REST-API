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
  state = {
    error: '',
  };

  componentDidMount = () => {
    let { basket, addBasket } = this.props;
    // here we check if there is something in the basket which means the user has come
    // from the product screen, if so then add to local storage
    if (basket.length !== 0) {
      let localStorageItems = Object.keys(localStorage);
      console.log(localStorageItems);
      localStorageItems.map((item) => {
        if (item !== 'userInfo') {
          return localStorage.removeItem(`${item}`);
        }
      });
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
      // Here I will store the basket in local storage and reload if the user refreshes the page,
      // I am mapping over the array and adding each item at a time which is what the reducer is expecting
      itemsFromLocalStorage.map((item) => {
        if (item['firstName'] === undefined) {
          addBasket(item);
        }
      });
  };

  isUserSignedIn = () => {
    let token = JSON.parse(localStorage.getItem('userInfo'));
    if (!token) {
      this.setState({ error: 'Please sign in or create an account to buy' });
    } else {
      this.props.history.push('check-out');
    }
  };
  render() {
    let { goBack, push } = this.props.history;
    let { basket, basketTotal } = this.props;
    let total = basketTotal();
    return (
      <div className={styles.shoppingbasket}>
        <h2>Your Shopping Basket</h2>
        {this.state.error !== '' && (
          <div className={styles.error}>{this.state.error}</div>
        )}
        <div className={styles.buttoncontainer}>
          {' '}
          <button
            className={styles.buttonshopping}
            onClick={() => this.props.history.push('/')}>
            Continue Shopping
          </button>
          <button
            disabled={basket.length === 0}
            onClick={() => this.isUserSignedIn()}
            className={styles.buttoncheckout}>
            Proceed to checkout
          </button>
          <br />
        </div>

        {basket.map((item, index) => {
          if (!item.token) {
            return (
              <>
                <CheckoutItem
                  details={item}
                  key={index}
                  id={index}
                  localStorageKey={`item${index}`}
                />
                <hr></hr>
              </>
            );
          }
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
          onClick={() => this.isUserSignedIn()}>
          Proceed to checkout
        </button>
        {this.state.error !== '' && (
          <div className={styles.error}>{this.state.error}</div>
        )}
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
