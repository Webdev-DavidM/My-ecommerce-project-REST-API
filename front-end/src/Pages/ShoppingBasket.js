/* NPM packages */

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */

import styles from './ShoppingBasket.module.css';

/* Components */

import CheckoutItem from '../Components/UIelements/CheckoutItem';

/* Action creators */

class ShoppingBasket extends Component {
  componentDidMount = () => {
    // I will get the items from redux here and put in state
  };
  render() {
    let { goBack, push } = this.props.history;
    let { basket } = this.props;
    return (
      <div className={styles.shoppingbasket}>
        <h2>Your Shopping Basket</h2>
        <div className={styles.buttoncontainer}>
          {' '}
          <button className={styles.buttonshopping} onClick={() => goBack()}>
            Continue Shopping
          </button>
          <button
            onClick={() => push('/check-out')}
            className={styles.buttoncheckout}>
            Proceed to checkout
          </button>
        </div>

        {basket.map((item) => {
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
        <button
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingBasket);
