/* NPM packages */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* css */

import styles from '../NavBar.module.css';

/* action creators */

import {
  showSide,
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
    console.log(chosenSubCategory);
    console.log(categories[chosenCategory][chosenSubCategory]);

    return (
      <div
        // onClick={() => this.props.closeMain()}
        className={styles.dropdown}
        onMouseEnter={() => this.props.mouseEnter()}
        onMouseLeave={() => showDropDown(false)}>
        <div className={styles.categories}>
          {categoryToShow.map((cat) => {
            console.log(categories[chosenCategory], cat);
            let iconMove =
              chosenSubCategory === cat ? styles.categoryItemMove : '';
            return (
              <div
                key={cat}
                className={`${styles.categoryItem} ${iconMove} `}
                onMouseEnter={(e) => {
                  console.log(e.target.textContent);
                  subCatToShow(e.target.textContent);
                  showSubCat(true);
                }}>
                <Link to={`/${cat}`}>{cat}</Link>
                <i className={`fas fa-arrow-right ${iconMove}`}></i>
              </div>
            );
          })}
        </div>
        <div className={styles.subcategories}>
          {showSubCategory
            ? categories[chosenCategory][chosenSubCategory].map((subCat) => (
                <div onClick={() => this.goToCategory(subCat)} key={subCat}>
                  {subCat}
                </div>
              ))
            : null}
        </div>
        <div className={styles.categoryImage}>
          <img
            src={`${process.env.PUBLIC_URL}/images/fitness image.png`}
            alt='fitness'></img>
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
    subCatToShow: (type) => {
      console.log(type);

      dispatch(subCatToShow(type));
    },
    showDropDown: (bool) => dispatch(showDrop(bool)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DropDownMenu)
);
