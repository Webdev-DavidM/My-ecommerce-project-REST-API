import React, { Component } from 'react';
import styles from './Checkout.module.css';
import CheckoutItem from '../Components/UIelements/CheckoutItem';

export default class Checkout extends Component {
  render() {
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
            <strong> Delivering to:</strong>&nbsp; 36 Havelock Road, Bromley,
            br2 9nx
          </span>
          <h4>Payment method</h4>
          <span>paypal and stripe needs to happen here</span>
        </div>
        <div className={styles.paymentmethod}></div>
        <div className={styles.ordersummary}>
          <div className={styles.itemcontainer}>
            <div className={styles.details}>
              <div className={styles.imagecontainer}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/cycle-slide1.jpg`}
                  alt=''
                />
              </div>
              <div className={styles.itemdetails}>
                <span>Vitus</span>
                <br />
                <span>Size:small</span>
                <br />
                <span>£1999</span>
                <br />
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.imagecontainer}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/cycle-slide1.jpg`}
                  alt=''
                />
              </div>
              <div className={styles.itemdetails}>
                <span>Vitus</span>
                <br />
                <span>Size:small</span>
                <br />
                <span>£1999</span>
                <br />
              </div>
            </div>
            <div> </div>
            <div className={styles.priceandquanity}></div>
            <h3 className={styles.itemcost}>Total: £1999</h3>
          </div>
        </div>
      </div>
    );
  }
}
