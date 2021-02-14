/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './CustomerReview.module.css';

/* Action creators */

import {
  sortByBestReviews,
  getProducts,
  resetFilterAll,
} from '../../../Actions/products';

class CustomerReviewFilter extends Component {
  state = {
    menu: false,
    categories: ['Best Customer reviews'],
    selectedDropDown: '',
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  reset = () => {
    this.setState({ selectedDropDown: false });

    this.props.getProducts(this.props.match.params.category);
    this.props.globalReset(true);
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  selected = () => {
    this.props.globalReset(false);
    this.props.bestReviews(this.props.products);
  };

  render() {
    console.log(this.props.reset);
    let dropdownClicked = this.state.menu ? styles.dropdownclicked : null;

    let dropbtnClicked =
      this.props.reset || this.state.menu ? styles.dropbtnclicked : null;

    let buttons = this.state.categories.map((category, index) => {
      return (
        <div key={index}>
          <button
            className={styles.inputbtn}
            name={category}
            style={
              // the reset doesnt make this selected false whcih it needs to
              !this.props.reset && this.props.selected
                ? { backgroundColor: '#f1c40f' }
                : null
            }
            onClick={() => this.selected()}
          />
          <span>&nbsp;&nbsp;&nbsp;{category}</span>
          <br />
        </div>
      );
    });

    return (
      <>
        <div className={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Reviews &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div className={`${styles.dropdowncontent} ${dropdownClicked}`}>
            {buttons}
            <button
              disabled={!this.props.selected || this.props.reset}
              onClick={() => this.reset()}
              className={styles.resetbest}>
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
    bestReviews: (products) => dispatch(sortByBestReviews(products)),
    getProducts: (category) => dispatch(getProducts(category)),
    globalReset: (bool) => dispatch(resetFilterAll(bool)),
  };
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    reset: state.products.globalFilterReset,
    selected: state.products.filterReview,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerReviewFilter)
);
