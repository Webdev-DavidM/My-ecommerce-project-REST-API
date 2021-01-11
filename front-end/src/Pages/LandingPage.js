import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.mainimage}>
      <img
        src={`${process.env.PUBLIC_URL}/images/landing-page-main-image.jpg`}
        alt='Man on a bike smiling'></img>
    </div>
  );
};

export default LandingPage;
