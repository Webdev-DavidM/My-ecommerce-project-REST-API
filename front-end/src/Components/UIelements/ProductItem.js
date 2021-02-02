import React from 'react';
import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';
const ProductItem = (props) => {
  console.log(props);
  let { images, _id, name, price } = props.details;
  console.log(_id);
  let mainImage = images[0];
  console.log(mainImage);
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
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
