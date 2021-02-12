/* NPM package */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './BrandFilter.module.css';

/* Action creators */

import { chosenBrand, getProducts } from '../../../Actions/products.js';

class BrandFilter extends Component {
  state = {
    menu: false,
    selectedDropDown: '',
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  dropdownSelected = (name) => {
    let { brandToFilter } = this.props;
    this.setState((prevState) => ({
      selectedDropDown: name,
    }));
    brandToFilter(name);
  };

  reset = () => {
    this.setState((prevState) => ({
      selectedDropDown: '',
    }));
    let { category } = this.props.match.params;
    let { resetProducts } = this.props;
    resetProducts(category);
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  render() {
    let brandsButtons;

    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;

    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;

    let { brands } = this.props;

    if (this.props.brands.length !== 0) {
      brandsButtons = brands.map((category, index) => {
        return (
          <div key={index}>
            <button
              disabled={this.state.selectedDropDown !== ''}
              className={styles.inputbtn}
              name={category}
              style={
                this.state.selectedDropDown === category
                  ? { backgroundColor: '#f1c40f' }
                  : null
              }
              onClick={() => this.dropdownSelected(category)}
            />
            <span>&nbsp;&nbsp;&nbsp;{category}</span>
            <br />
          </div>
        );
      });
    }

    return (
      <>
        <div className={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Brands &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div className={`${styles.dropdowncontent} ${dropdownClicked}`}>
            {brandsButtons}
            <button
              disabled={this.state.selectedDropDown === ''}
              onClick={() => this.reset()}
              className={styles.clearbrand}>
              {' '}
              Reset
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.products.filteredBrands,
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    brandToFilter: (brand) => dispatch(chosenBrand(brand)),
    resetProducts: (category) => dispatch(getProducts(category)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BrandFilter)
);
