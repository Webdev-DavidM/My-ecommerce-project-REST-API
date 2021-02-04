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

import { chosenProduct, addToBasket } from '../Actions/products';

class Product extends Component {
  state = {
    size: '',
    showBasketModal: false,
    dropdownSelected: false,
    quantity: 0,
    error: '',
    selectedProduct: null,
  };

  selectSize = (e) => {
    this.setState({ size: e.target.value, error: '' });
  };

  selectQuantity = (operator) => {
    let { selectedProduct } = this.state;
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
      if (this.state.quantity < selectedProduct.size[0][this.state.size]) {
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
    let { images, price, _id, name } = this.state.selectedProduct;
    console.log(this.props);

    if (this.state.size !== '' && this.state.quantity !== 0) {
      let itemInfo = {
        size: this.state.size,
        qtyOfSizeInStock: this.state.selectedProduct.size[0][this.state.size],
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

  componentDidMount = () => {
    let { products } = this.props;

    let { id } = this.props.match.params;
    console.log(products, id);
    let chosenProduct = products.filter((product) => {
      return product._id === id;
    });
    this.setState({ selectedProduct: chosenProduct[0] });
    console.log(chosenProduct);
  };

  render() {
    let { selectedProduct } = this.state;
    let { showBasketModal } = this.state;
    let dropdown = null;

    if (selectedProduct !== null) {
      let sizeKeys = Object.keys(selectedProduct.size[0]);
      dropdown = (
        <>
          {sizeKeys.map((key, index) => (
            <option
              key={index}
              value={key}
              disabled={selectedProduct.size[0][key] === 0}
              onClick={(e) => this.selectSize(e)}>
              {key}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {selectedProduct.size[0][key]} in stock
            </option>
          ))}
        </>
      );
    }

    return (
      <>
        {selectedProduct !== null ? (
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
            <Reviews />
            <h2>
              <span
                className={styles.gobackbtn}
                onClick={() => this.props.history.goBack()}>
                Go back
              </span>
            </h2>
            <hr></hr>
            <ProductImageCarousel images={selectedProduct.images} />

            <div className={styles.productinfo}>
              <div className={styles.column1}>
                {' '}
                <p className={styles.price}>£{selectedProduct.price}</p>
                {selectedProduct.colour && (
                  <p>colour: {selectedProduct.colour}</p>
                )}
                <div>{selectedProduct.name}</div>
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
                  {selectedProduct.stock !== 0 ? (
                    <span style={{ color: 'red' }}>
                      Hurry only {selectedProduct.stock} left in stock
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
                <h3>{selectedProduct.description}</h3>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products.products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToBasket: (itemInfo) => dispatch(addToBasket(itemInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
