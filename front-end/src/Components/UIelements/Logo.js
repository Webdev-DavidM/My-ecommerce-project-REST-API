/* NPM packages */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* css */

import styles from '../NavBar.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <NavLink to='/'>
        <img
          src={`${process.env.PUBLIC_URL}/images/Logo.png`}
          alt='DM sports logo'></img>
      </NavLink>
    </div>
  );
};

export default Logo;
