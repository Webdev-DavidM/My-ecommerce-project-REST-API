import React from 'react';
import styles from './CheckoutItem.module.css';

const CheckoutItem = (props) => {
  let { name, image, price, quantity } = props.details;
  return (
    <div className={styles.itemcontainer}>
      <div className={styles.details}>
        <div className={styles.imagecontainer}>
          <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt='' />
        </div>
        <div className={styles.itemdetails}>
          <span>{name}</span>
          <br />
          <span>Size:small</span>
          <br />
          <span>£1999</span>
          <br />
        </div>
      </div>
      <div> </div>
      <div className={styles.priceandquanity}>
        <div>
          {' '}
          <button
            className={styles.qtybtn1}
            // onClick={() =>
            //   this.setState((prevState) => ({
            //     quantity: prevState.quantity - 1,
            //   }))
            // }
            //
          >
            -
          </button>
          <span className={styles.amount}>1</span>
          <button
            className={styles.qtybtn2}
            // onClick={() =>
            //   this.setState((prevState) => ({
            //     quantity: prevState.quantity + 1,
            //   }))
            // }
          >
            +
          </button>
        </div>
        <button
          className={styles.bin}
          // onClick={() =>
          //   this.setState((prevState) => ({
          //     quantity: prevState.quantity + 1,
          //   }))
          // }
        >
          <i class='fa fa-trash' aria-hidden='true'></i>
        </button>

        <h3 className={styles.itemcost}>Total: {price}</h3>
      </div>
    </div>
  );
};

export default CheckoutItem;
