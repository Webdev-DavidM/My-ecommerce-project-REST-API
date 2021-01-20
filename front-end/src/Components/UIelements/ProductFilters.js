import React, { Component } from 'react';
import styles from './ProductFilters.module.css';

import BestSellingFilter from '../UIelements/Filters/BestSellingFilter';
import PriceRange from '../UIelements/Filters/PriceRange';

export default class ProductFilters extends Component {
  state = {};

  render() {
    return (
      <div className={styles.filters}>
        <BestSellingFilter />
        <PriceRange />
      </div>
    );
  }
}
