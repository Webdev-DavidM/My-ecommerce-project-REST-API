/* NPM packages */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* css */

/* action creators */

import {
  showSide,
  showSubCategory,
  subCatToShow,
} from '../../Actions/products';

import styles from '../NavBar.module.css';

class SideMenu extends Component {
  goToCategory = (subCat) => {
    this.props.showSideMenu(false);
    this.props.history.push(
      `${this.props.chosenCategory}/${this.props.chosenSubCategory}/${subCat}`
    );
  };

  render() {
    // destructured dispatch action creators from mapDispatchToProps
    let {
      showSubCat,
      subCatToShow,
      // showSubCategory,
      showSideMenu,
    } = this.props;

    // Destructured state from mapStateToProps
    let {
      categories,
      chosenCategory,
      chosenSubCategory,
      showSubCategory,
    } = this.props;
    let categoryToShow = Object.keys(categories[chosenCategory]);
    return (
      <>
        <div
          className={styles.sidemenu}
          onMouseLeave={() => showSideMenu(false)}>
          <div className={styles.maincats}></div>
          <div className={styles.sidecategories}>
            {categoryToShow.map((cat) => {
              let iconMove =
                chosenSubCategory === cat ? styles.categoryItemMove : '';
              return (
                <div
                  className={`${styles.categoryItem} ${iconMove} `}
                  // I have changed this from hover to click for the mobile side menu
                  onClick={(e) => {
                    subCatToShow(e.target.textContent);
                    showSubCat(true);
                  }}>
                  <Link to={`/${cat}`}>{cat}</Link>
                  <i className={`fas fa-arrow-right ${iconMove}`}></i>
                </div>
              );
            })}
          </div>
          <div className={styles.sidesubcategories}>
            {showSubCategory
              ? categories[chosenCategory][chosenSubCategory].map((subCat) => (
                  <div onClick={() => this.goToCategory(subCat)} key={subCat}>
                    {subCat}
                  </div>
                ))
              : null}
          </div>
          <div
            className={styles.closebutton}
            onClick={() => showSideMenu(false)}
            style={{ width: '1.6rem', height: '1.6rem' }}>
            <i
              className='fas fa-window-close'
              style={{
                width: 'inherit',
                height: 'inherit',
                backgroundColor: 'white',
              }}></i>
          </div>
        </div>
      </>
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
    showSideMenu: (bool) => dispatch(showSide(bool)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideMenu)
);
