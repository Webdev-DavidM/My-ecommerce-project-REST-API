import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../NavBar.module.css';

import { returnAllProducts } from '../../Actions/products.js';

class SearchBar extends Component {
  state = {
    userInput: '',
  };
  componentDidMount = () => {
    this.props.getProducts();
  };

  userInput = (e) => {};

  render() {
    let { products } = this.props;
    console.log(products);

    return (
      <>
        <div className={styles.search}>
          <input
            onChange={(e) => this.search(e)}
            type='text'
            id='fname'
            name='fname'></input>
          <div className={styles.searchicon}>
            {' '}
            <i className='fas fa-search '></i>{' '}
          </div>
          <div className={styles.results}>
            {this.props.products &&
              this.props.products.map((product) => (
                <div>
                  {product.name}
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.searchProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(returnAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
