import React from 'react';
import styles from './Admin.module.css';

const AdminProducts = () => {
  return (
    <div className={styles.adminproducts}>
      <header>
        <p>PRODUCTS</p>
        <button className={styles.createbtn}>+ Create product</button>
      </header>
      <div className={styles.categorybtns}>
        <p>CATEGORIES</p>
        <button>Run</button>
        <button>Bike</button>
        <button>Swim</button>
        <button>Run</button>
        <button>Bike</button>
      </div>
      <div className={styles.productlist}>
        <div className={styles.productitem}>
          <span>ID: 32879741</span>
          <span>Name: Vitus bike</span>
          <span>Price: £599</span>
          <span>SubCategory: Road Bikes</span>
          <span>Brand: Vitus</span>
          <div className={styles.buttoncontainer}>
            <button className={styles.editbtn}>Edit</button>
            <button className={styles.deletebtn}>Delete</button>
          </div>
        </div>
        <div className={styles.productitem}>d</div>
        <div className={styles.productitem}>d</div>
        <div className={styles.productitem}>d</div>
      </div>
    </div>
  );
};

export default AdminProducts;
