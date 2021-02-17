/* NPM packages */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './PriceRangeFilter.module.css';

/* Action creators */

import {
  sortViaPriceRange,
  getProducts,
  resetFilterAll,
  updatePriceFilter,
} from '../../../Actions/products.js';

class PriceRangeFilter extends Component {
  state = {
    menu: false,
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  inputLowerPriceRange = (value) => {
    let number = parseInt(value);
    if (Number.isInteger(number)) {
      this.props.updateFilter({ price: number, higher: false });
    }
  };

  inputHigherPriceRange = (value) => {
    let number = parseInt(value);
    if (Number.isInteger(number)) {
      this.props.updateFilter({ price: number, higher: true });
    }
  };

  submitValues = () => {
    let { submitRange } = this.props;
    if (this.props.lowerPrice !== 0 && this.props.higherPrice !== 0) {
      submitRange(this.props.lowerPrice, this.props.higherPrice);
      this.props.globalReset(false);
    }
  };

  resetValues = () => {
    let { category } = this.props.match.params;
    this.props.updateFilter({ price: 0, higher: true });
    this.props.updateFilter({ price: 0, higher: false });
    this.props.resetProducts(category);
    this.props.globalReset(true);
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  render() {
    let dropdownClicked = this.state.menu ? styles.dropdownclicked : null;
    let dropbtnClicked =
      this.props.reset || this.state.menu ? styles.dropbtnclicked : null;

    return (
      <>
        <div className={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Price Range &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div className={`${styles.dropdowncontent} ${dropdownClicked}`}>
            <span>From</span>
            <div className={styles.inputvalues}>
              <span>£</span>
              <input
                type='text'
                // onFocus={() => this.setState({ lowerPriceRange: '' })}
                // onBlur={() =>
                //   this.state.lowerPriceRange === 0 &&
                //   this.setState({ lowerPriceRange: 0 })
                // }
                value={this.props.lowerPrice}
                onChange={(e) => this.inputLowerPriceRange(e.target.value)}
              />
            </div>
            <span>To</span>
            <div className={styles.inputvalues}>
              <span>£</span>
              <input
                onFocus={() => this.setState({ higherPriceRange: '' })}
                // onBlur={() =>
                //   this.props.higher === 0 &&
                //   this.setState({ higherPriceRange: 0 })
                // }
                type='text'
                value={this.props.higherPrice}
                onChange={(e) => this.inputHigherPriceRange(e.target.value)}
              />
            </div>
            <button
              onClick={() => this.submitValues()}
              className={styles.applyprice}>
              Apply
            </button>
            <button
              disabled={
                this.props.higherPrice === 0 ||
                this.props.lowerPrice === 0 ||
                this.props.reset ||
                !this.props.selected
              }
              onClick={() => this.resetValues()}
              className={styles.resetprice}>
              {' '}
              Reset all filters
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitRange: (low, high) => dispatch(sortViaPriceRange(low, high)),
    resetProducts: (category) => dispatch(getProducts(category)),
    globalReset: (bool) => dispatch(resetFilterAll(bool)),
    updateFilter: (data) => dispatch(updatePriceFilter(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    brands: state.products.filteredBrands,
    products: state.products.products,
    reset: state.products.globalFilterReset,
    selected: state.products.filterPrice,
    lowerPrice: state.products.filterLowerPrice,
    higherPrice: state.products.filterHigherPrice,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PriceRangeFilter)
);
