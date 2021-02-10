/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './CustomerReview.module.css';

/* Action creators */

import { sortByBestReviews, getProducts } from '../../../Actions/products';

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

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  render() {
    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;
    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;
    let { bestReviews } = this.props;
    let buttons = this.state.categories.map((category, index) => {
      return (
        <div key={index}>
          <button
            className={styles.inputbtn}
            name={category}
            style={
              this.state.selectedDropDown === category
                ? { backgroundColor: '#f1c40f' }
                : null
            }
            onClick={() => bestReviews(this.props.products)}
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
              onClick={() =>
                this.props.clearFilter(this.props.match.params.category)
              }
              className={styles.resetbest}>
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
    bestReviews: (products) => dispatch(sortByBestReviews(products)),
    clearFilter: (category) => dispatch(getProducts(category)),
  };
};

const mapStateToProps = (state) => {
  return { products: state.products.products };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerReviewFilter)
);
