import React from 'react';
import styles from './ProductItem.module.css';

const ProductItem = (props) => {
  let { image, price, name, reviews } = props.details;
  return (
    <div className={styles.productitem}>
      <div>
        <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt='' />
      </div>
      <div className={styles.productdetails}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{price}</p>
        <p className={styles.reviews}>reviews will go here</p>
      </div>
    </div>
  );
};

export default ProductItem;
