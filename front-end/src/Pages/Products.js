import React, { Component } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import ProductItem from '../Components/UIelements/ProductItem';

export default class Products extends Component {
  state = {
    products: [
      {
        image: 'cycle-slide2.png',
        name: 'Vitus',
        price: '£2999.00',
        reviews: [],
      },
      {
        image: 'cycle-slide2.png',
        name: 'Vitus',
        price: '£2999.00',
        reviews: [],
      },
      {
        image: 'cycle-slide2.png',
        name: 'Vitus',
        price: '£2999.00',
        reviews: [],
      },
      {
        image: 'cycle-slide2.png',
        name: 'Vitus',
        price: '£2999.00',
        reviews: [],
      },
      {
        image: 'cycle-slide2.png',
        name: 'Vitus',
        price: '£2999.00',
        reviews: [],
      },
      {
        image: 'cycle-slide2.png',
        name: 'Vitus',
        price: '£2999.00',
        reviews: [],
      },
    ],
  };

  componentDidMount = () => {};

  render() {
    const { category } = this.props.match.params;
    const { type } = this.props.match.params;
    let products = this.state.products.map((product, index) => (
      <ProductItem details={product} key={index} />
    ));
    return (
      <div className={styles.products}>
        <span>{<Link to={`/${category}`}>{category}/ &#32;</Link>}</span>
        &#32;
        <span>{<Link to={`${category}/${type}`}>{type}</Link>}</span>
        <div className={styles.productitems}>{products}</div>
      </div>
    );
  }
}
