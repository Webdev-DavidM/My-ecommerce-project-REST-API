/* NPM packages */
import Media from 'react-media';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

/* CSS */
import styles from './NavBar.module.css';
import './NavBar.module.css';
/* UI*/

/* Components */
import Logo from './UIelements/Logo';
import Basket from './UIelements/Basket';
import SearchBar from './UIelements/SearchBar';
import DropDownMenu from './UIelements/DropDownMenu';
import SideMenu from './UIelements/SideMenu';

/*Action creators */

import {
  selectedCategory,
  showDrop,
  showSide,
  showSubCategory,
  clearProducts,
  getProducts,
} from '../Actions/products.js';

class NavBar extends Component {
  render() {
    // Destructuring for mapStateToProps
    let { showDrop, showSide, showSubCat, signedIn } = this.props;

    //Destructuring for mapDispatchToProps
    let {
      chosenCategory,
      showDropDown,
      showSideMenu,
      clearProds,
      getNewProducts,
    } = this.props;
    return (
      <>
        <div>
          <div className={styles.navbar}>
            <Logo size='2rem' />
            <div
              className={styles.user}
              onMouseEnter={() => showSideMenu(true)}
              style={{
                width: '1.3rem',
                height: '1.3rem',
                color: '#ecf0f1',
                margin: '0 auto 0 1rem',
              }}>
              {/* <i
                className='fas fa-store'
                style={{ width: '100%', height: '100%' }}></i> */}
            </div>
            <div
              className={styles.store}
              onMouseEnter={() => showSide(true)}
              style={{
                width: '1.3rem',
                height: '1.3rem',
                color: '#ecf0f1',
                marginLeft: 'auto',
              }}>
              <i
                className='fas fa-user'
                style={{ width: '100%', height: '100%' }}></i>
            </div>
            <Basket />
            <SearchBar />
            <div className={styles.links}>
              {signedIn ? (
                <Link to='/account'>Your Account</Link>
              ) : (
                <Link to='/sign-in'>Sign in</Link>
              )}
              {/* {Below are two features I will add later} */}
              {/* <Link to='/admin'>Admin</Link>
              <Link to='/stores'>Stores</Link> */}
            </div>
          </div>
        </div>
        <div className={styles.categorylinks}>
          <Link
            onClick={() => {
              showSubCat(false);
              showDropDown(true);
              showSideMenu(true);
              chosenCategory('cycle');
              clearProds();
              getNewProducts('cycle');
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/cycle'>
            CYCLE
          </Link>
          <Link
            onClick={(e) => {
              showSubCat(false);
              chosenCategory('run');
              showDropDown(true);
              showSideMenu(true);
              clearProds();
              getNewProducts('run');
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/run'>
            RUN
          </Link>
          <Link
            onClick={() => {
              showSubCat(false);
              showDropDown(true);
              showSideMenu(true);
              chosenCategory('swim');
              clearProds();
              getNewProducts('swim');
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/swim'>
            SWIM
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Media
            query='(min-width: 768px)'
            render={() => (
              <CSSTransition
                in={showDrop}
                timeout={300}
                classNames='menufade'
                unmountOnExit>
                <DropDownMenu
                  mouseEnter={() => showDropDown(true)}
                  mouseLeave={() => showDropDown(false)}
                  closeMain={this.closeDropMenu}
                />
              </CSSTransition>
            )}
          />
        </div>
        <Media
          query='(max-width: 768px)'
          render={() => (
            <CSSTransition
              in={showSide}
              timeout={300}
              classNames='sidemenu'
              unmountOnExit>
              <SideMenu />
            </CSSTransition>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSide: state.products.showSideMenu,
    showDrop: state.products.showDropDownMenu,
    signedIn: state.user.signedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSubCat: (bool) => dispatch(showSubCategory(bool)),
    chosenCategory: (category) => dispatch(selectedCategory(category)),
    showDropDown: (bool) => dispatch(showDrop(bool)),
    showSideMenu: (bool) => dispatch(showSide(bool)),
    clearProds: () => dispatch(clearProducts),
    getNewProducts: (category) => dispatch(getProducts(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
