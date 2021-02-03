import React from 'react';
import styles from './ProductFilters.module.css';

import CustomerReviewFilter from '../UIelements/Filters/CustomerReviewFilter';
import PriceRangeFilter from '../UIelements/Filters/PriceRangeFilter';
import StockFilter from '../UIelements/Filters/StockFilter';
import BrandFilter from '../UIelements/Filters/BrandFilter';

const ProductFilters = () => {
  return (
    <div className={styles.filters}>
      <CustomerReviewFilter />
      <PriceRangeFilter />
      <StockFilter />
      <BrandFilter />
    </div>
  );
};

export default ProductFilters;
