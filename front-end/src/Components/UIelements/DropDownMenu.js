/* NPM packages */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* css */

import styles from '../NavBar.module.css';

/* action creators */

import {
  showDrop,
  showSubCategory,
  subCatToShow,
} from '../../Actions/products';

class DropDownMenu extends Component {
  goToCategory = (subCat) => {
    this.props.showDropDown(false);
    this.props.history.push(
      `${this.props.chosenCategory}/${this.props.chosenSubCategory}/${subCat}`
    );
  };

  render() {
    // destructured dispatch action creators from mapDispatchToProps
    let {
      showSubCat,
      subCatToShow,
      showSubCategory,
      showDropDown,
    } = this.props;

    // Destructured state from mapStateToProps
    let { categories, chosenCategory, chosenSubCategory } = this.props;
    let categoryToShow = Object.keys(categories[chosenCategory]);

    return (
      <div
        className={styles.dropdown}
        onMouseEnter={() => this.props.mouseEnter()}
        onMouseLeave={() => showDropDown(false)}>
        <div className={styles.categories}>
          {categoryToShow.map((cat) => {
            let iconMove =
              chosenSubCategory === cat ? styles.categoryItemMove : '';
            return (
              <div
                key={cat}
                className={`${styles.categoryItem} ${iconMove} `}
                onMouseEnter={(e) => {
                  subCatToShow(e.target.textContent);
                  showSubCat(true);
                }}>
                {cat}
                <i className={`fas fa-arrow-right ${iconMove}`}></i>
              </div>
            );
          })}
        </div>
        <div className={styles.subcategories}>
          {showSubCategory
            ? categories[chosenCategory][chosenSubCategory].map(
                (subCat, index) => (
                  <div key={index}>
                    <Link
                      to={`/${chosenCategory}/${chosenSubCategory}/${subCat}`}>
                      {subCat}
                    </Link>
                  </div>
                )
              )
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.products.categories,
    chosenCategory: state.products.chosenCategory,
    chosenSubCategory: state.products.chosenSubCategory,
    showSubCategory: state.products.showSubCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSubCat: (bool) => dispatch(showSubCategory(bool)),
    subCatToShow: (type) => dispatch(subCatToShow(type)),
    showDropDown: (bool) => dispatch(showDrop(bool)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DropDownMenu)
);
