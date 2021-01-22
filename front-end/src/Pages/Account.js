import React, { Component } from 'react';
import styles from './Account.module.css';
import Media from 'react-media';

export default class Account extends Component {
  state = {
    orders: [
      {
        Date: '24 august 2020',
        Number: 253644444,
        Total: 24.0,
        Status: 'Delivered',
      },
      {
        Date: '24 august 2020',
        Number: 253644444,
        Total: 24.0,
        Status: 'Delivered',
      },
      {
        Date: '24 august 2020',
        Number: 253644444,
        Total: 24.0,
        Status: 'Delivered',
      },
    ],
  };

  componentDidMount = () => {
    // when the component mounts I will get the orders from redux or the server and then render them
  };

  render() {
    return (
      <div className={styles.account}>
        <Media
          query='(min-width: 768px)'
          render={() => (
            <div className={styles.largerscreenbanner}>
              <p>Welcome David | Your Account</p>
              <button className={styles.logoutbtn}>Log out</button>
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
          {this.state.orders.map((order) => {
            return (
              <>
                <div className={styles.ordersdetails}>
                  <span>{order.Date}</span>
                  <span style={{ color: '#2980b9' }}>{order.Number}</span>
                  <span>{order.Total}</span>
                  <span style={{ color: '#16a085' }}>{order.Status}</span>
                  <div className={styles.lstbtn}>
                    <button className={styles.returnbtn}>Make a return</button>
                    <button className={styles.orderbtn}>View your order</button>
                  </div>
                </div>
                <div
                  style={{
                    borderTop: '1px solid #bdc3c7 ',
                    marginLeft: 5,
                    marginRight: 5,
                  }}></div>
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
