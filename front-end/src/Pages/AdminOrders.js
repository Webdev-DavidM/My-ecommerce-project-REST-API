import React from 'react';
import styles from './AdminOrders.module.css';
import Media from 'react-media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// this can be stateless as it just needs the orders as props
// and just needs to display them

const AdminOrders = () => {
  return (
    <>
      <div className={styles.adminorderdetails}>
        <h2>Customer Orders</h2>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.orderdetails}>
          <span>ID: 1111111</span>
          <span>User: David Mulholland</span>
          <span>Date: 2/3/2019</span>
          <span>Total: £1999</span>
          <span>
            Paid : <FontAwesomeIcon icon={faCheck} />
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
