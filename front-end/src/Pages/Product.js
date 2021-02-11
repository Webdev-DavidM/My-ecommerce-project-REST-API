/* NPM packages */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* css */

import styles from './Product.module.css';

/* Components */

import ProductImageCarousel from '../Components/UIelements/ProductImageCarousel';
import Reviews from '../Components/UIelements/Reviews';

/* Action creators */

import {
  addToBasket,
  getProduct,
  clearSelectedProduct,
} from '../Actions/products';

class Product extends Component {
  state = {
    size: '',
    showBasketModal: false,
    dropdownSelected: false,
    quantity: 0,
    error: '',
  };

  selectSize = (e) => {
    this.setState({ size: e.target.value, error: '' });
  };

  selectQuantity = (operator) => {
    let { product } = this.props;
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
      if (this.state.quantity < product.size[0][this.state.size]) {
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
    /* Destructuring action creators */
    let { addProductToBasket } = this.props;
    /* Destructuring state from redux */
    let { images, price, _id, name } = this.props.product;

    if (this.state.size !== '' && this.state.quantity !== 0) {
      let itemInfo = {
        size: this.state.size,
        qtyOfSizeInStock: this.props.product.size[0][this.state.size],
        quantity: this.state.quantity,
        name: name,
        id: _id,
        price: price,
        images: images,
      };
      addProductToBasket(itemInfo);
      this.setState({ showBasketModal: true });
    } else {
      this.setState({ error: 'Please select a size and quantity' });
    }
  };

  componentDidUpdate = (newProps) => {
    if (newProps.location.pathname !== this.props.match.url) {
      let { getProductFromServer } = this.props;
      console.log(newProps);
      let id = newProps.history.location.pathname.split('/')[2];
      console.log(id);
      getProductFromServer(id);
    }
  };

  componentDidMount = () => {
    let { getProductFromServer } = this.props;
    let { id } = this.props.match.params;
    console.log(id);
    getProductFromServer(id);
  };

  componentWillUnmount = () => {
    this.props.clearProduct();
  };

  render() {
    let { product } = this.props;

    let { showBasketModal } = this.state;
    let dropdown = null;
    console.log(product);

    if (product.length !== 0) {
      let sizeKeys = Object.keys(product.size[0]);
      dropdown = (
        <>
          {sizeKeys.map((key, index) => (
            <option
              key={index}
              value={key}
              disabled={product.size[0][key] === 0}
              onClick={(e) => this.selectSize(e)}>
              {key}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {product.size[0][key]} in stock
            </option>
          ))}
        </>
      );
    }
    console.log(product);

    return (
      <>
        {product ? (
          <div className={styles.product}>
            {showBasketModal && (
              <div className={styles.basketmodal}>
                <div className={styles.basket}>
                  <h2>
                    {' '}
                    <i class='fas fa-check'></i>
                    &nbsp;Added to cart{' '}
                  </h2>
                  <button
                    onClick={() => this.setState({ showBasketModal: false })}
                    className={styles.continueshoppingbtn}>
                    Continue shopping
                  </button>

                  <Link
                    className={styles.checkoutbtn}
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={'/shopping-basket'}>
                    Checkout now
                  </Link>
                </div>
              </div>
            )}
            <p className='{styles.title}'></p>
            {product.length !== 0 && product.reviews.length !== 0 ? (
              <Reviews reviews={product.reviews} />
            ) : null}
            <h2>
              <span
                className={styles.gobackbtn}
                onClick={() => this.props.history.goBack()}>
                Go back
              </span>
            </h2>
            <hr></hr>
            {product.length !== 0 && (
              <ProductImageCarousel images={product.images} />
            )}
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
                  {product.stock !== 0 ? (
                    <span style={{ color: 'red' }}>
                      Hurry only {product.stock} left in stock
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>Sorry out of stock</span>
                  )}
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
                <h3>{product.description}</h3>
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
    addProductToBasket: (itemInfo) => dispatch(addToBasket(itemInfo)),
    getProductFromServer: (id) => dispatch(getProduct(id)),
    clearProduct: () => dispatch(dispatch(clearSelectedProduct())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
