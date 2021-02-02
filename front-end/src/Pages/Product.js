/* NPM packages */

import React, { Component } from 'react';
import { connect } from 'react-redux';

/* css */

import styles from './Product.module.css';

/* Components */

import ProductImageCarousel from '../Components/UIelements/ProductImageCarousel';
import Reviews from '../Components/UIelements/Reviews';

/* Action creators */

import { chosenProduct, addToBasket } from '../Actions/products';

class Product extends Component {
  state = {
    size: '',
    dropdownSelected: false,
    quantity: 0,
    error: '',
  };

  selectSize = (e) => {
    this.setState({ size: e.target.value, error: '' });
  };

  selectQuantity = (operator) => {
    if (this.state.size === '') {
      this.setState({ error: 'Please select a size first' });
    }
    if (operator === '-') {
      if (this.state.quantity !== 0) {
        this.setState((prevState) => ({
          quantity: prevState.quantity - 1,
          error: '',
        }));
      }
    }
    if (operator === '+') {
      if (this.state.quantity < this.props.product.size[0][this.state.size]) {
        this.setState((prevState) => ({
          quantity: prevState.quantity + 1,
        }));
      } else {
        this.setState({
          error: `Maximum quantity in ${this.state.size} selected`,
        });
      }
    }
  };

  addToBasket = () => {
    let { addProductToBasket } = this.props;
    if (this.state.size !== '' && this.state.quantity !== 0) {
      let itemInfo = {
        size: this.state.size,
        quantity: this.state.quantity,
        id: this.props.product._id,
        price: this.props.product.price,
      };
      addProductToBasket(itemInfo);
    } else {
      this.setState({ error: 'Please select a size and quantity' });
    }
  };

  componentDidMount = () => {
    let { selectProduct } = this.props;
    let { id } = this.props.match.params;
    selectProduct(id);
  };

  render() {
    let { product } = this.props;
    let sizeKeys = product ? Object.keys(product.size[0]) : null;
    let dropdown = product ? (
      <>
        {sizeKeys.map((key) => (
          <option value={key} onClick={(e) => this.selectSize(e)}>
            {key}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {product.size[0][key]} in stock
          </option>
        ))}
      </>
    ) : null;

    return (
      <>
        {product ? (
          <div className={styles.product}>
            <p className={styles.title}></p>
            <Reviews />
            <hr></hr>
            <ProductImageCarousel images={product.images} />

            <div className={styles.productinfo}>
              <div className={styles.column1}>
                {' '}
                <p className={styles.price}>£{product.price}</p>
                {product.colour && <p>colour: {product.colour}</p>}
                <div>{product.name}</div>
                <div className={styles.sizecontainer}>
                  <form
                    onClick={() =>
                      this.setState((prevState) => ({
                        dropdownSelected: !prevState.dropdownSelected,
                      }))
                    }>
                    {this.state.size !== '' ? (
                      <span>{this.state.size}</span>
                    ) : (
                      <span>Please select</span>
                    )}{' '}
                    {!this.state.dropdownSelected && (
                      <span>
                        <i class='fas fa-arrow-down'></i>
                      </span>
                    )}
                    {this.state.dropdownSelected && dropdown}
                  </form>
                </div>
                <br></br>
                <div className={styles.quantity}>
                  <form>Quantity:</form>
                  <button
                    className={styles.qtybtn1}
                    onClick={() => this.selectQuantity('-')}>
                    -
                  </button>
                  <input type='input' value={this.state.quantity}></input>
                  <button
                    className={styles.qtybtn2}
                    onClick={() => this.selectQuantity('+')}>
                    +
                  </button>
                  <br />
                  <br />

                  <span style={{ color: 'red' }}>
                    Hurry only {product.stock} left in stock
                  </span>
                </div>
                <button
                  onClick={() => this.addToBasket()}
                  className={styles.addtocartbtn}>
                  {' '}
                  <i
                    className='fas fa-shopping-cart'
                    style={{ width: '1rem', height: '1rem' }}>
                    {' '}
                  </i>
                  &nbsp; &nbsp;Add to Basket
                </button>
                {this.state.error && (
                  <div className={styles.error}>{this.state.error}</div>
                )}
              </div>
              <div className={styles.column2}>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { product: state.products.selectedProduct };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectProduct: (id) => dispatch(chosenProduct(id)),
    addProductToBasket: (itemInfo) => dispatch(addToBasket(itemInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
