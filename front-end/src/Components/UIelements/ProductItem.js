import React from 'react';
import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';
const ProductItem = (props) => {
  let { image, price, name, reviews } = props.details;
  return (
    <div className={styles.productitem}>
      <div>
        <Link to={`/product/2`}>
          {' '}
          <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt='' />
        </Link>
      </div>
      <div className={styles.productdetails}>
        <div>
          <Link to={`/product/2`} style={{ textDecoration: 'none' }}>
            <p className={styles.name}>{name}</p>
          </Link>
          <p className={styles.price}>{price}</p>
          <p className={styles.reviews}>reviews will go here</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
