import React, { Component } from 'react';
import styles from './ProductFilters.module.css';

import BestSellingFilter from '../UIelements/Filters/BestSellingFilter';
import PriceRangeFilter from '../UIelements/Filters/PriceRangeFilter';
import StockFilter from '../UIelements/Filters/StockFilter';
import BrandFilter from '../UIelements/Filters/BrandFilter';

export default class ProductFilters extends Component {
  state = {};

  render() {
    return (
      <div className={styles.filters}>
        <BestSellingFilter />
        <PriceRangeFilter />
        <StockFilter />
        <BrandFilter />
      </div>
    );
  }
}
