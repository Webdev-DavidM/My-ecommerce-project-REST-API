/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */
import styles from './CheckoutItem.module.css';

/* Action creators */

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
    let { size, qtyOfSizeInStock } = this.props.details;
    console.log(this.state.quantity, qtyOfSizeInStock);
    if (operator === '-') {
      if (this.state.quantity !== 0) {
        this.setState((prevState) => ({
          quantity: prevState.quantity - 1,
          error: '',
        }));
      }
    }
    if (operator === '+') {
      if (this.state.quantity < qtyOfSizeInStock) {
        this.setState((prevState) => ({
          quantity: prevState.quantity + 1,
        }));
      } else {
        this.setState({
          error: `Maximum quantity available`,
        });
      }
    }
  };

  render() {
    let { name, images, price, quantity, size } = this.props.details;
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
          <button
            className={styles.bin}
            onClick={() => this.adjustQuantity('+')}>
            <i class='fa fa-trash' aria-hidden='true'></i>
          </button>
          {this.state.error && (
            <span className={styles.error}>{this.state.error}</span>
          )}

          <h2 className={styles.itemcost} style={{ color: '#3498db' }}>
            Total: £{price}
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { product: state.products.selectedProduct };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // selectProduct: (id) => dispatch(chosenProduct(id)),
    // addProductToBasket: (itemInfo) => dispatch(addToBasket(itemInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
