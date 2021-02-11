/* NPM packages */
import React from 'react';
import { Link } from 'react-router-dom';

/* CSS */

import styles from './ShopButton.module.css';

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
