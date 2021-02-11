import React from 'react';
import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';

import Reviews from '../UIelements/Reviews.js';

const ProductItem = (props) => {
  console.log(props);
  let { images, _id, name, price, stock, reviews, rating } = props.details;

  let mainImage = images[0];
  return (
    <div className={styles.productitem}>
      <div>
        <Link to={`/product/${_id}`}>
          {' '}
          <img src={`http://localhost:5000${mainImage}`} alt='' />
        </Link>
      </div>
      <div className={styles.productdetails}>
        <div>
          <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
            <p className={styles.name}>{name}</p>
          </Link>
          <p className={styles.price}>£{price}</p>
          <div className={styles.stars}>
            <p style={{ color: '#27ae60' }}>Average rating: {rating}</p>
          </div>

          {stock === 0 && (
            <h2 className={styles.outofstock}>Sorry out of stock</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
