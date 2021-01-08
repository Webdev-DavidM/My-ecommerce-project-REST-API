import React, { Component } from 'react';
import styles from './NavBar.module.css';
import Logo from './UIelements/Logo';
import { Link } from 'react-router-dom';
import Basket from './UIelements/Basket';
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
            style={{ width: '1.5rem', height: '1.5rem', color: '#ecf0f1' }}>
            <i
              class='fas fa-bars'
              style={{ color: '#ecf0f1', width: '100%', height: '100%' }}></i>
          </div>
          <Logo size='2rem' />
          <Basket />
          <SearchBar />
          <div className={styles.links}>
            <Link to='/account'>Account</Link>
            <Link to='/admin'>Admin</Link>
            <Link to='/stores'>Stores</Link>
          </div>
        </div>
      </div>
    );
  }
}
