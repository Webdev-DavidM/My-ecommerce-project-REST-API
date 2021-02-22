/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import date from 'date-and-time';

/* CSS */
import styles from './Checkout.module.css';

/* Action creators */

import { addToBasket, emptyBasket } from '../Actions/products.js';
import { sendOrderToServer, closeModal } from '../Actions/orders';

class Checkout extends Component {
  componentDidMount = () => {
    let { basket, addBasket } = this.props;

    // here we check if there is something in the basket which means the user has come
    // from the product screen, if so then add to local storage
    if (basket.length !== 0) {
      let localStorageItems = Object.keys(localStorage);
      localStorageItems.map((item) => {
        return item !== 'userInfo' && localStorage.removeItem(`${item}`);
      });
      basket.map((item, index) => {
        return localStorage.setItem(`item${index}`, JSON.stringify(item));
      });
    }

    // here we check if the page has been refreshed and there is nothing in the basket, if there
    // is an item in local storage then dispatch it to be added to basket in redux so it can populate this screen
    let localStorageItems = Object.keys(localStorage);
    let itemsFromLocalStorage = localStorageItems.map((item) =>
      JSON.parse(localStorage.getItem(`${item}`))
    );

    if (basket.length === 0 && itemsFromLocalStorage)
      // Here I will store the basket in local storage and reload if the user refreshes the page,
      // I am mapping over the array and adding each item at a time which is what the reducer is expecting
      itemsFromLocalStorage.map((item) => {
        return item['firstName'] === undefined && addBasket(item);
      });
  };

  placeOrder = () => {
    let { userDetails, basket, basketTotal, sendOrder } = this.props;
    let total = basketTotal();
    total = total.Total;
    const now = new Date();
    let formattedDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    // //Below I am getting the items from the basket and removing properties the server doesnt need before sending it
    // let itemDetails = [...basket];
    // console.log(itemDetails);

    let order = {
      date: formattedDate,
      userId: userDetails.id,
      orderItems: basket,
      total: total,
      status: 'ordered',
      token: userDetails.token,
    };
    sendOrder(order);
  };

  closeModal = () => {
    // This method will clear the basket and local storage, close the modal and then send the user back to the homepage
    let { clearBasket, clearModal } = this.props;
    if (!this.props.error) {
      clearBasket();
      let localStorageItems = Object.keys(localStorage);
      localStorageItems.map((key) => {
        return key !== 'userInfo' && localStorage.removeItem(`${key}`);
      });
      clearModal();
      this.props.history.push('/');
    }
    clearModal();
  };

  render() {
    let { firstName, lastName, address } = this.props.userDetails;
    let { basket, basketTotal } = this.props;
    let total = basketTotal();
    return (
      <div className={styles.checkoutcontainer}>
        {this.props.showModal ? (
          <div className={styles.ordermodal}>
            <div className={styles.basket}>
              <h2>
                {' '}
                <i className='fas fa-check'></i>
                &nbsp;
                {!this.props.error ? (
                  <span>Order confirmed!</span>
                ) : (
                  <span>Order failed!Please try again</span>
                )}
              </h2>
              <button
                onClick={() => this.closeModal()}
                className={styles.continueshoppingbtn}>
                {!this.props.error ? (
                  <span>Continue shopping</span>
                ) : (
                  <span>Try again</span>
                )}
              </button>

              <Link
                className={styles.checkoutbtn}
                style={{ textDecoration: 'none', color: 'white' }}
                to={'/orders'}>
                View orders
              </Link>
            </div>
          </div>
        ) : null}
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
            {basket.map((item, index) => (
              <div className={styles.details} key={index}>
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
            <span className={styles.orderbtn} onClick={() => this.placeOrder()}>
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
    showModal: state.orders.showOrdersModal,
    basket: state.products.basket,
    error: state.orders.errors,
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
    sendOrder: (orderInfo) => dispatch(sendOrderToServer(orderInfo)),
    clearBasket: () => dispatch(emptyBasket()),
    clearModal: () => dispatch(closeModal()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
