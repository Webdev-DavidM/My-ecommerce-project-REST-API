/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */
import styles from './CheckoutItem.module.css';

/* Action creators */

import {
  updateToBasket,
  deleteItemFromBasket,
} from '../../Actions/products.js';

class CheckoutItem extends Component {
  state = {
    quantity: null,
    error: '',
  };

  componentDidMount = () => {
    let { quantity } = this.props.details;
    this.setState({ quantity });
  };

  adjustQuantity = (operator) => {
    let { updateBasket } = this.props;
    let { qtyOfSizeInStock } = this.props.details;
    let { id } = this.props;
    if (operator === '-') {
      if (this.state.quantity !== 0) {
        updateBasket(id, this.state.quantity - 1);
        this.setState((prevState) => ({
          quantity: prevState.quantity - 1,
          error: '',
        }));
      } else {
        this.setState({ error: 'Nothing in basket' });
      }
    }
    if (operator === '+') {
      if (this.state.quantity < qtyOfSizeInStock) {
        updateBasket(id, this.state.quantity + 1);
        this.setState((prevState) => ({
          quantity: prevState.quantity + 1,
          error: '',
        }));
      } else {
        this.setState({
          error: `Maximum quantity available`,
        });
      }
    }
  };

  render() {
    console.log(this.props.details);
    let { name, images, price, size, id } = this.props.details;

    let { deleteItem } = this.props;

    return (
      <div className={styles.itemcontainer}>
        <div className={styles.details}>
          <div className={styles.imagecontainer}>
            <img src={`http://localhost:5000/${images[0]}`} alt='' />
          </div>
          <div className={styles.itemdetails}>
            <span>{name}</span>
            <br />
            <span>Size:{size}</span>
            <br />
            <span style={{ color: '#3498db' }}>£{price}</span>
            <br />
          </div>
        </div>
        <div> </div>
        <div className={styles.priceandquanity}>
          <div>
            {' '}
            <button
              className={styles.qtybtn1}
              onClick={() => this.adjustQuantity('-')}>
              -
            </button>
            <span style={{ color: '#27ae60' }} className={styles.amount}>
              {this.state.quantity}
            </span>
            <button
              className={styles.qtybtn2}
              onClick={() => this.adjustQuantity('+')}>
              +
            </button>
          </div>
          <button className={styles.bin} onClick={() => deleteItem(id)}>
            <i class='fa fa-trash' aria-hidden='true'></i>
          </button>
          {this.state.error && (
            <span className={styles.error}>{this.state.error}</span>
          )}

          <h2 className={styles.itemcost} style={{ color: '#3498db' }}>
            Total: £{price * this.state.quantity}
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { basket: state.products.basket };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBasket: (id, quantity) => dispatch(updateToBasket(id, quantity)),
    deleteItem: (id) => dispatch(deleteItemFromBasket(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
