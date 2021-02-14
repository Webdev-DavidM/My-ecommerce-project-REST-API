/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

/* css */

import styles from './StockFilter.module.css';

/* Action creators */

import {
  showInStock,
  getProducts,
  resetFilterAll,
} from '../../../Actions/products.js';

class StockFilter extends Component {
  state = {
    menu: false,
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  reset = () => {
    let { resetProducts } = this.props;
    let { category } = this.props.match.params;

    resetProducts(category);
    this.props.globalReset(true);
  };

  returnOnlyInStock = () => {
    let { inStock } = this.props;
    inStock();
    this.props.globalReset(false);
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  render() {
    let dropdownClicked = this.state.menu ? styles.dropdownclicked : null;

    let dropbtnClicked =
      this.props.reset || this.state.menu ? styles.dropbtnclicked : null;

    let stockBtn = (
      <button
        className={styles.inputbtn}
        style={
          // I need to set each filter to false if reset is true and then it will
          !this.props.reset && this.props.selected
            ? { backgroundColor: '#f1c40f' }
            : null
        }
        onClick={() => this.returnOnlyInStock()}
      />
    );

    return (
      <>
        <div className={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Stock &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div className={`${styles.dropdowncontent} ${dropdownClicked}`}>
            <div>
              {stockBtn}
              <span>&nbsp;&nbsp;&nbsp;In stock</span>

              <button
                disabled={!this.props.selected || this.props.reset}
                className={styles.clearselection}
                onClick={() => this.reset()}>
                Reset all filters
              </button>
              <br />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inStock: () => dispatch(showInStock()),
    resetProducts: (category) => dispatch(getProducts(category)),
    globalReset: (bool) => dispatch(resetFilterAll(bool)),
  };
};

const mapStateToProps = (state) => {
  return {
    brands: state.products.filteredBrands,
    products: state.products.products,
    reset: state.products.globalFilterReset,
    selected: state.products.filterStock,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StockFilter)
);
