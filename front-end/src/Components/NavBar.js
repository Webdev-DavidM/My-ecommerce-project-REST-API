import React, { Component } from 'react';
import styles from './NavBar.module.css';
import Logo from './UIelements/Logo';
import { Link } from 'react-router-dom';
import Basket from './UIelements/Basket';
import SearchBar from './UIelements/SearchBar';
import DropDownMenu from './UIelements/DropDownMenu';
import { CSSTransition } from 'react-transition-group';
import './NavBar.module.css';
import SideMenu from './UIelements/SideMenu';
import Media from 'react-media';

// As part of this navigation page I will have nested routing

export default class NavBar extends Component {
  state = {
    showSideMenu: false,
    showDropDownMenu: true,
  };

  showDropMenu = (e) => {
    // console.log(e.target.textContent.toLowerCase());
    this.setState({ showDropDownMenu: true });
  };

  closeDropMenu = (e) => {
    // console.log(e.target.textContent.toLowerCase());
    this.setState({ showDropDownMenu: false });
  };

  closeSideMenu = (e) => {
    // console.log(e.target.textContent.toLowerCase());
    this.setState({ showSideMenu: false });
  };

  render() {
    return (
      <>
        <div>
          <div className={styles.navbar}>
            {/*This hamburger menu below will dispappear in desktop mode*/}

            <div
              className={styles.menu}
              onMouseEnter={() => this.setState({ showSideMenu: true })}
              style={{ width: '1.5rem', height: '1.5rem', color: '#ecf0f1' }}>
              <i
                className='fas fa-bars'
                style={{ width: '100%', height: '100%' }}></i>
            </div>
            <Logo size='2rem' />
            <div
              className={styles.user}
              onMouseEnter={() => this.setState({ showSideMenu: true })}
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
              onMouseEnter={() => this.setState({ showSideMenu: true })}
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
            onMouseEnter={() => this.setState({ showDropDownMenu: true })}
            onMouseLeave={() =>
              this.props.mouseEnter &&
              this.setState({ showDropDownMenu: false })
            }
            to='/cycle'>
            CYCLE
          </Link>
          <Link to='/run'>RUN</Link>
          <Link to='/swim'>SWIM</Link>
          <Link to='/indoors'>INDOORS</Link>
          <Link to='/outdoors'>OUTDOORS</Link>
          <Link to='/triathlon'>TRIATHLON</Link>
        </div>
        <Media
          query='(min-width: 768px)'
          render={() => (
            <CSSTransition
              in={this.state.showDropDownMenu}
              timeout={300}
              classNames='menufade'
              unmountOnExit>
              <DropDownMenu
                mouseEnter={this.showDropMenu}
                mouseLeave={this.closeDropMenu}
                closeMain={this.closeDropMenu}
              />
            </CSSTransition>
          )}
        />
        <Media
          query='(max-width: 768px)'
          render={() => (
            <CSSTransition
              in={this.state.showSideMenu}
              timeout={300}
              classNames='sidemenu'
              unmountOnExit>
              <SideMenu
                closeSide={this.closeSideMenu}
                closeMain={this.closeDropMenu}
              />
            </CSSTransition>
          )}
        />
      </>
    );
  }
}
