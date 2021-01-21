import React from 'react';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  return (
    <>
      <h2 className={styles.heading}>Order 237638833</h2>
      <div className={styles.orderscontainer}>
        <div className={styles.shippingpaymentcontainer}>
          <h3>SHIPPING</h3>
          <span>Name: David Mulholland</span>
          <span>Email: footballblubber@googlemail.com</span>
          <span>Address: 36 Havelock Road, Bromley, Kent, BR2 9NZ</span>
          <div className={styles.status}>Delivered</div>
          <div className={styles.hr}></div>
          <h3>PAYMENT</h3>
          <span>Method: Paypal</span>
          <div className={styles.status}>Paid</div>
        </div>
        <div className={styles.orderitemscontainer}>
          <h2>Order Items</h2>
          <div className={styles.itemdetails}>
            <span className={styles.imagecontainer}>
              <img
                src={`${process.env.PUBLIC_URL}/images/cycle-slide1.jpg`}
                alt=''
              />
            </span>
            <span className={styles.details}>Vitus bike</span>
            <span>1 x £999 = £999</span>
          </div>
        </div>

        <div className={styles.ordersummarycontainer}>
          {' '}
          <h3>ORDER SUMMARY</h3>
          <span>Items: £399</span>
          <span>Delivery: £49</span>
          <span>Total £449</span>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
