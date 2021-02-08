/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */
import styles from './Checkout.module.css';

/* Action creators */

import { addToBasket } from '../Actions/products.js';

class Checkout extends Component {
  componentDidMount = () => {
    let { basket, addBasket } = this.props;
    // here we check if there is something in the basket which means the user has come
    // from the product screen, if so then add to local storage
    if (basket.length !== 0) {
      let localStorageItems = Object.keys(localStorage);
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

  render() {
    let { firstName, lastName, address } = this.props.userDetails;
    let { basket, basketTotal } = this.props;
    let total = basketTotal();

    return (
      <div className={styles.checkoutcontainer}>
        <h2>
          <span
            className={styles.gobackbtn}
            onClick={() => this.props.history.goBack()}>
            Go back
          </span>
        </h2>
        <h2>Summary</h2>
        <hr></hr>

        <div className={styles.deliveryaddress}>
          <h4>Delivery</h4>
          <span>
            <strong> Delivering to:</strong>&nbsp;{address}
          </span>
          <h4>Name</h4>
          <span>
            <strong> Delivering to:</strong>&nbsp; {firstName} {lastName}
          </span>
          <h4>Payment method</h4>
          <span>paypal and stripe needs to happen here</span>
        </div>
        <div className={styles.paymentmethod}></div>
        <div className={styles.ordersummary}>
          <div className={styles.itemcontainer}>
            {basket.map((item) => (
              <div className={styles.details}>
                <div className={styles.imagecontainer}>
                  <img src={`http://localhost:5000/${item.images[0]}`} alt='' />
                </div>

                <div className={styles.itemdetails}>
                  <div style={{ width: '40%' }}>
                    {' '}
                    <span>{item.name}</span>
                  </div>
                  <div style={{ width: '20%' }}>
                    {' '}
                    <span>Size:&nbsp;{item.size}</span>
                  </div>
                  <div style={{ width: '15%' }}>
                    {' '}
                    <span>Quantity:&nbsp;{item.quantity}</span>
                  </div>
                  <div style={{ width: '15%' }}>
                    {' '}
                    <span>Price: £{item.price}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.priceandquanity}></div>
            <h3 className={styles.itemcost}>Total: £{total.Total}</h3>
            <span
              className={styles.orderbtn}
              onClick={() => this.props.history.goBack()}>
              Place order
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.user.user,
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
