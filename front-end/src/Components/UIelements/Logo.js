import React from 'react';
import styles from '../NavBar.module.css';
import { NavLink } from 'react-router-dom';

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
