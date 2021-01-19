import React, { Component } from 'react';
import styles from './ProductFilters.module.css';
import FilterButton from './FilterButton';

export default class ProductFilters extends Component {
  state = {
    showBestSellingMenu: false,
    showshowStockMenuMenu: false,
    showPriceMenu: false,
    showBrand: false,
  };

  render() {
    console.log('re rendered');
    return (
      <div className={styles.filters}>
        <FilterButton />
        <FilterButton />
        <FilterButton />
        <FilterButton />
        {/* 
        <div className={styles.filters}>
        <div class={styles.dropdown}>
          <div class={styles.dropbtn}>
            Best selling &#127; &#127; &#127; &#127;
            <i class='fas fa-chevron-down'></i>
          </div>
          <div class={styles.dropdowncontent}>
            <a href='/'>Link 1</a>
            <a href='/'>Link 2</a>
            <a href='/'>Link 3</a>
          </div>
        </div>
        <div
          className={styles.bestselling}
          onClick={() =>
            this.setState((prevState) => ({
              showBestSellingMenu: !prevState.showBestSellingMenu,
            }))
          }>
          <i class='fas fa-chevron-down'></i>
        </div>

        <div
          className={styles.showStockMenu}
          onClick={() =>
            this.setState((prevState) => ({
              showStockMenu: !prevState.showStockMenu,
            }))
          }>
          sTOCK &#127; &#127; &#127; &#127;
          <span>
            {this.state.showStockMenu ? (
              <span>
                <i class='fas fa-chevron-down'></i>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur iste fugit cupiditate officia minus nihil quos
                  neque obcaecati est! Explicabo velit iste reiciendis vitae
                </p>
              </span>
            ) : (
              <span>
                <i class='fas fa-chevron-up'></i>
              </span>
            )}
          </span>
        </div>
        <div>
          Price &#127; &#127; &#127; &#127;
          <i class='fas fa-chevron-down'></i>
        </div>
        <div>
          Brand&#127; &#127; &#127; &#127;
          <i class='fas fa-chevron-down'></i>
        </div> */}
      </div>
    );
  }
}
