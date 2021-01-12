import React from 'react';
import styles from './ShopButton.module.css';
import { Link } from 'react-router-dom';

const ShopButton = ({ url }) => {
  console.log(url);
  return (
    <div className={styles.shopbutton}>
      <Link to={`${url}`}>SHOP</Link>
    </div>
  );
};

export default ShopButton;
