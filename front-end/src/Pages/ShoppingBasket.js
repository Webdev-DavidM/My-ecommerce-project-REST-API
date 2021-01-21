import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import styles from './ShoppingBasket.module.css';

import CheckoutItem from '../Components/UIelements/CheckoutItem';
import CheckOut from '../Pages/CheckOut';

export default class ShoppingBasket extends Component {
  state = {
    basketItems: [
      {
        name: 'vitus',
        image: 'cycle-slide1.jpg',
        price: 1999,
        quantity: 1,
      },
      {
        name: 'specialised',
        image: 'cycle-slide2.png',
        price: 3222,
        quantity: 3,
      },
    ],
  };

  componentDidMount = () => {
    // I will get the items from redux here and put in state
  };
  render() {
    let { match } = this.props;
    return (
      <div className={styles.shoppingbasket}>
        <h2>Your Shopping Basket</h2>
        <div className={styles.buttoncontainer}>
          {' '}
          <button className={styles.buttonshopping}>Continue Shopping</button>
          <button className={styles.buttoncheckout}>Proceed to checkout</button>
        </div>

        {this.state.basketItems.map((item) => {
          return (
            <>
              <CheckoutItem details={item} key={item.name} />
              <hr></hr>
            </>
          );
        })}
        <h2 style={{ textAlign: 'right', marginRight: '4rem' }}>
          Total price: £999
        </h2>
        <button className={styles.buttoncheckout}>Proceed to checkout</button>
        <Router>
          <Link to={`${match.url}/checkout`}></Link>
          <Route path={`${match.url}/checkout`} component={CheckOut} />
        </Router>
      </div>
    );
  }
}
