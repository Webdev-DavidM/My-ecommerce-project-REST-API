/*Npm packages */
import React, { Component } from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */
import styles from './Account.module.css';

/* Action creators */

import { getOrdersForUser } from '../Actions/orders.js';
import { logUserOut } from '../Actions/users.js';

class Account extends Component {
  componentDidMount = () => {
    let { getOrders } = this.props;
    let user = JSON.parse(localStorage.getItem('userInfo'));
    getOrders({ user: user.id, token: user.token });
  };

  logOut = () => {
    let { logOutUser } = this.props;
    logOutUser();
    this.props.history.push('/');
  };

  render() {
    let { orders, user } = this.props;

    return (
      <div className={styles.account}>
        <Media
          query='(min-width: 768px)'
          render={() => (
            <div className={styles.largerscreenbanner}>
              {user && (
                <p>
                  Welcome {user.firstName} {user.lastName} | Your Account
                </p>
              )}

              <button
                onClick={() => this.logOut()}
                className={styles.logoutbtn}>
                Log out
              </button>
            </div>
          )}
        />
        <div className={styles.adminorderscontainer}>
          <h3>Your Recent orders</h3>
        </div>
        <div
          style={{
            borderTop: '2px solid black ',
            marginLeft: 20,
            marginRight: 20,
          }}></div>
        <div className={styles.orders}>
          <Media
            query='(min-width: 768px)'
            render={() => (
              <>
                <div className={styles.headingscontainer}>
                  <span>Date</span>
                  <span>Number</span>
                  <span>Total</span>
                  <span>Status</span>
                  <span>What next?</span>
                </div>
                <div
                  style={{
                    borderTop: '1px solid #bdc3c7 ',
                    marginLeft: 5,
                    marginRight: 5,
                  }}></div>
              </>
            )}
          />
          {orders !== undefined &&
            orders.length !== 0 &&
            orders.map((order, index) => {
              return (
                <div key={index}>
                  <div className={styles.ordersdetails} key={index}>
                    <span>{order.dateOfOrder.split(' ')[0]}</span>
                    <span style={{ color: '#2980b9' }}>{order._id}</span>
                    <span>Total cost: £{order.total}</span>
                    <span style={{ color: '#16a085' }}>{order.status}</span>
                    <div className={styles.lstbtn}>
                      <button
                        onClick={() =>
                          this.props.history.push(`/order/${order._id}`)
                        }
                        className={styles.orderbtn}>
                        View your order
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: '1px solid #bdc3c7 ',
                      marginLeft: 5,
                      marginRight: 5,
                    }}></div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { orders: state.orders.orders, user: state.user.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (userInfo) => dispatch(getOrdersForUser(userInfo)),
    logOutUser: () => dispatch(logUserOut()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
