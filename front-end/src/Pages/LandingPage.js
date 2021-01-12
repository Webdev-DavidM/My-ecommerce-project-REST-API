import React from 'react';
import styles from './LandingPage.module.css';
import ShopButton from '../Components/UIelements/ShopButton';

const LandingPage = () => {
  return (
    <div className={styles.landingpage}>
      <div className={styles.mainimage}>
        <img
          src={`${process.env.PUBLIC_URL}/images/landing-page-main-image.jpg`}
          alt='Man on a bike smiling'></img>
      </div>

      <div className={styles.running}>
        <img
          src={`${process.env.PUBLIC_URL}/images/running-montage.png`}
          alt='man running and red running jacket'
        />
        <div className={styles.catdetailsrunning}>
          {' '}
          <p>RUN</p>
          <ShopButton url='/running' />
        </div>
      </div>

      <div className={styles.cycling}>
        <img
          src={`${process.env.PUBLIC_URL}/images/cycling-montage.png`}
          alt='cyclist smiling and bike'
        />
        <div className={styles.catdetailscycling}>
          {' '}
          <p>CYCLE</p>
          <ShopButton url='/cycling' />
        </div>
      </div>
      <div className={styles.swimming}>
        <img
          src={`${process.env.PUBLIC_URL}/images/swimming-montage.png`}
          alt='woman swimming and a swim suit'
        />
        <div className={styles.catdetailsswimming}>
          {' '}
          <p>SWIM</p>
          <ShopButton url='/swimming' />
        </div>
      </div>
      <div className={styles.outdoor}>
        <img
          src={`${process.env.PUBLIC_URL}/images/outdoor-montage.png`}
          alt='woman swimming and a swim suit'
        />
        <div className={styles.catdetailsoutdoor}>
          {' '}
          <p>OUTDOOR</p>
          <ShopButton url='/outdoor' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
