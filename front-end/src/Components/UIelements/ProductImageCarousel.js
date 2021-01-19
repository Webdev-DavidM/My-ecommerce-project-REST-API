import styles from './ProductImageCarousel.module.css';
import React, { Component } from 'react';

import FilterButton from './FilterButton';

export default class ProductImageCarousel extends Component {
  render() {
    return (
      <>
        <div className={styles.slideshowcontainer}>
          <div className={`${styles.myslides} ${styles.fade}`}>
            <a className={styles.prev} href='/'>
              <i class='fas fa-angle-left'></i>
            </a>
            <img
              src={`${process.env.PUBLIC_URL}/images/cycle-slide2.png`}
              alt={'hello'}></img>
            <a className={styles.next} href='/'>
              <i class='fas fa-angle-right'></i>
            </a>
          </div>
        </div>
        <br></br>

        <div style={{ textAlign: 'center' }}>
          <span className={styles.dot} onclick='currentSlide(1)'></span>
          <span className={styles.dot} onclick='currentSlide(2)'></span>
          <span className={styles.dot} onclick='currentSlide(3)'></span>
        </div>
      </>
    );
  }
}
