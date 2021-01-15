import React, { Component } from 'react';
import styles from '../NavBar.module.css';

export default class SearchBar extends Component {
  render() {
    return (
      <div className={styles.search}>
        <input type='text' id='fname' name='fname'></input>
        <div>
          {' '}
          <i className='fas fa-search '></i>{' '}
        </div>
      </div>
    );
  }
}
