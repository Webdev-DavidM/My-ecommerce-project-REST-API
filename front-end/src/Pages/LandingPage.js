import React from 'react';
import styles from './LandingPage.module.css';
import ShopButton from '../Components/UIelements/ShopButton';

const LandingPage = () => {
  return (
    <div className={styles.landingpage}>
      <header>
        THE UK'S <span>&#127; NO.1 &#127;</span> ONLINE FITNESS STORE
      </header>
      <div className={styles.mainimage}>
        <img
          src={`${process.env.PUBLIC_URL}/images/landing-page-main-image.jpg`}
          alt='Man on a bike smiling'></img>
      </div>

      <header className={styles.title2}>
        <strong>
          DM Sports <span> + &#127;</span>
        </strong>
        NEXT DAY DELIVERY AND FREE RETURNS FOR ONLY &#127;{' '}
        <strong>£9.99</strong>
        <div>
          <ShopButton url='/running' name='FIND OUT MORE' width='8rem' />
        </div>
      </header>
      <div className={styles.running}>
        <img
          src={`${process.env.PUBLIC_URL}/images/running-montage.png`}
          alt='man running and red running jacket'
        />
        <div className={styles.catdetailsrunning}>
          {' '}
          <p>RUN</p>
          <ShopButton url='/running' name='SHOP' />
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
          <ShopButton url='/cycling' name='SHOP' />
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
          <ShopButton url='/swimming' name='SHOP' />
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
          <ShopButton url='/outdoor' name='SHOP' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
