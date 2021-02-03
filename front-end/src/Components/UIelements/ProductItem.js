import React from 'react';
import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';

const ProductItem = (props) => {
  let { images, _id, name, price, stock } = props.details;
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
          <p className={styles.reviews}>reviews will go here</p>
          {stock === 0 && (
            <h2 style={{ color: '#e74c3c' }}>Sorry out of stock</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
