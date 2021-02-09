/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './OrderDetails.module.css';

/* Action creators */

import { getIndividualOrder } from '../Actions/orders.js';

class OrderDetails extends Component {
  state = {};

  componentDidMount = () => {
    let { id } = this.props.match.params;
    let { getOrder } = this.props;
    getOrder(id);
  };
  render() {
    let { order } = this.props;

    return (
      <>
        {order !== null && (
          <>
            <span
              className={styles.gobackbtn}
              onClick={() => this.props.history.goBack()}>
              Go back
            </span>
            <h2 className={styles.heading}>Order {order._id}</h2>
            <div className={styles.orderscontainer}>
              <div className={styles.shippingpaymentcontainer}>
                <h3>SHIPPING</h3>
                <span>
                  Name: {order.user.firstName} {order.user.lastName}
                </span>
                <span>Email: {order.user.email}</span>
                <span>Address: {order.user.address}</span>
                <div className={styles.status}>{order.status}</div>
                <div className={styles.hr}></div>
                <h3>PAYMENT</h3>
                <span>Method: Paypal</span>
                <div className={styles.status}>Paid</div>
              </div>
              <div className={styles.orderitemscontainer}>
                <h2>Order Items</h2>
                {order.orderItems.map((item) => (
                  <div className={styles.itemdetails}>
                    <span className={styles.details}>{item.name}</span>
                    <span className={styles.details}>
                      &nbsp;:&nbsp;quantity&nbsp;{item.qty} x £{item.price} = £
                      {item.price * item.qty}
                    </span>
                    <span
                      className={styles.reviewbtn}
                      onClick={() => this.setState}>
                      Submit a review
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.ordersummarycontainer}>
                {' '}
                <h3>ORDER SUMMARY</h3>
                <span>Items: £{order.total}</span>
                <span>Delivery: £49</span>
                <span>Total £{order.total + 49}</span>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    order: state.orders.order,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(getIndividualOrder(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
);
