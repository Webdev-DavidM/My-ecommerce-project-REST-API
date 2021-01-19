import React from 'react';
import styles from './ProductFilters.module.css';

const FilterButton = () => {
  return (
    <>
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
        }></div>
    </>
  );
};

export default FilterButton;
