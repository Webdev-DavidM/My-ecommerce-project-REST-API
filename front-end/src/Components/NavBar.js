import React, { Component } from 'react';
import styles from './NavBar.module.css';
import Logo from './UIelements/Logo';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from './UIelements/SearchBar';
// As part of this navigation page I will have nested routing

export default class NavBar extends Component {
  state = {
    checkoutHover: false,
  };

  cartHover = () => {
    console.log('hello');
    this.setState({
      checkoutHover: true,
    });
  };

  render() {
    return (
      <div>
        <div className={styles.navbar}>
          {/*This hamburger menu below will dispappear in desktop mode*/}
          <div
            className={styles.menu}
            style={{ width: '1.5rem', height: '1.5rem' }}>
            <i
              class='fas fa-bars'
              style={{ color: '#ecf0f1', width: '100%', height: '100%' }}></i>
          </div>
          <Logo size='2rem' />
          <div
            className={styles.cartdesktop}
            style={{ width: '5rem', height: '2rem', color: '#2980b9' }}>
            <Link to='/shopping-basket' color='red'>
              <i
                class='fas fa-shopping-cart'
                style={{ width: '0.9rem', height: '0.9rem' }}>
                {' '}
              </i>
              <span>£799 &#127;&#127;&#40;2&#41;</span>
            </Link>
          </div>
          <div
            className={styles.cart}
            style={{ width: '1.5rem', height: '1.5rem' }}>
            <NavLink to='/shopping-basket'>
              <i
                color='#2980b9'
                class='fas fa-shopping-cart'
                style={{ color: '#ecf0f1', width: '100%', height: '100%' }}></i>
            </NavLink>
          </div>
          <SearchBar />
        </div>
      </div>
    );
  }
}
