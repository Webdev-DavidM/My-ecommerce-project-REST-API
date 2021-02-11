/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

/* css */

import styles from './StockFilter.module.css';

/* Action creators */

import { showInStock, getProducts } from '../../../Actions/products.js';

class StockFilter extends Component {
  state = {
    menu: false,
    inStockSelected: false,
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  reset = () => {
    let { resetProducts } = this.props;
    let { category } = this.props.match.params;
    this.setState({ inStockSelected: false });
    resetProducts(category);
  };

  returnOnlyInStock = () => {
    let { inStock } = this.props;
    this.setState({ inStockSelected: true });
    inStock();
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  render() {
    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;

    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;

    let stockBtn = (
      <button
        className={styles.inputbtn}
        style={
          this.state.inStockSelected ? { backgroundColor: '#f1c40f' } : null
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
                disabled={!this.state.inStockSelected}
                className={styles.clearselection}
                onClick={() => this.reset()}>
                Reset
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
  };
};

export default withRouter(connect(null, mapDispatchToProps)(StockFilter));
