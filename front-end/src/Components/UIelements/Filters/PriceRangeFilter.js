/* NPM packages */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './PriceRangeFilter.module.css';

/* Action creators */

import { sortViaPriceRange, getProducts } from '../../../Actions/products.js';

class PriceRangeFilter extends Component {
  state = {
    menu: false,
    lowerPriceRange: 0,
    higherPriceRange: 0,
    selectedDropDown: '',
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  inputLowerPriceRange = (value) => {
    let number = parseInt(value);
    if (Number.isInteger(number)) {
      this.setState({ lowerPriceRange: number });
    }
  };

  inputHigherPriceRange = (value) => {
    let number = parseInt(value);
    if (Number.isInteger(number)) {
      this.setState({ higherPriceRange: number });
    }
  };

  submitValues = () => {
    let { lowerPriceRange, higherPriceRange } = this.state;
    let { submitRange } = this.props;
    if (lowerPriceRange !== 0 && higherPriceRange !== 0) {
      submitRange(lowerPriceRange, higherPriceRange);
    }
  };

  resetValues = () => {
    let { category } = this.props.match.params;
    this.setState({
      lowerPriceRange: 0,
      higherPriceRange: 0,
    });
    this.props.resetProducts(category);
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });

    // here i will need to iterate over all the products to see what brands
    // there are then display, for now I will hard code in state
  };

  render() {
    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;
    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;

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
                onFocus={() => this.setState({ lowerPriceRange: '' })}
                onBlur={() =>
                  this.state.lowerPriceRange === 0 &&
                  this.setState({ lowerPriceRange: 0 })
                }
                value={this.state.lowerPriceRange}
                onChange={(e) => this.inputLowerPriceRange(e.target.value)}
              />
            </div>
            <span>To</span>
            <div className={styles.inputvalues}>
              <span>£</span>
              <input
                onFocus={() => this.setState({ higherPriceRange: '' })}
                onBlur={() =>
                  this.state.lowerPriceRange === 0 &&
                  this.setState({ higherPriceRange: 0 })
                }
                type='text'
                value={this.state.higherPriceRange}
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
                this.state.higherPriceRange === 0 ||
                this.state.lowerPriceRange === 0
              }
              onClick={() => this.resetValues()}
              className={styles.resetprice}>
              {' '}
              Reset
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
  };
};

export default withRouter(connect(null, mapDispatchToProps)(PriceRangeFilter));
