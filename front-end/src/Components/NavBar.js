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
import {
  selectedCategory,
  showDrop,
  showSide,
  showSubCategory,
} from '../Actions/products.js';

// As part of this navigation page I will have nested routing

class NavBar extends Component {
  render() {
    // Destructuring for mapStateToProps
    let { showDrop, showSide, showSubCat } = this.props;

    //Destructuring for mapDispatchToProps
    let { chosenCategory, showDropDown, showSideMenu } = this.props;
    return (
      <>
        <div>
          <div className={styles.navbar}>
            {/*This hamburger menu below will dispappear in desktop mode*/}

            <div
              className={styles.menu}
              onMouseEnter={() => showSideMenu(true)}
              style={{ width: '1.5rem', height: '1.5rem', color: '#ecf0f1' }}>
              <i
                className='fas fa-bars'
                style={{ width: '100%', height: '100%' }}></i>
            </div>
            <Logo size='2rem' />
            <div
              className={styles.user}
              onMouseEnter={() => showSideMenu(true)}
              style={{
                width: '1.3rem',
                height: '1.3rem',
                color: '#ecf0f1',
                marginLeft: 'auto',
              }}>
              <i
                className='fas fa-store'
                style={{ width: '100%', height: '100%' }}></i>
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
              <Link to='/account'>Your Account</Link>
              <Link to='/admin'>Admin</Link>
              <Link to='/stores'>Stores</Link>
            </div>
          </div>
        </div>
        <div className={styles.categorylinks}>
          <Link
            onMouseEnter={() => {
              showSubCat(false);
              showDropDown(true);
              chosenCategory('cycle');
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/cycle'>
            CYCLE
          </Link>
          <Link
            onMouseEnter={() => {
              showSubCat(false);
              chosenCategory('run');
              showDropDown(true);
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/run'>
            RUN
          </Link>
          <Link
            onMouseEnter={() => {
              showSubCat(false);
              showDropDown(true);
              chosenCategory('swim');
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/swim'>
            SWIM
          </Link>
          <Link
            onMouseEnter={() => {
              showSubCat(false);
              showDropDown(true);
              chosenCategory('outdoors');
            }}
            onMouseLeave={() => this.props.mouseEnter && showDropDown(false)}
            to='/outdoors'>
            OUTDOORS
          </Link>
        </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSubCat: (bool) => dispatch(showSubCategory(bool)),
    chosenCategory: (category) => dispatch(selectedCategory(category)),
    showDropDown: (bool) => dispatch(showDrop(bool)),
    showSideMenu: (bool) => dispatch(showSide(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
