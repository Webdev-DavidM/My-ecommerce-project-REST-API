import React from 'react';
import styles from './ShopButton.module.css';
import { Link } from 'react-router-dom';

const ShopButton = ({ url, name, width, height }) => {
  return (
    <div
      className={styles.shopbutton}
      style={{ width: `${width}`, height: `${height}` }}>
      <Link to={`${url}`}>{name} </Link>
    </div>
  );
};

export default ShopButton;
