import React, { Component } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import MobileProductFilterMenu from '../Components/UIelements/MobileProductFilterMenu';
import Media from 'react-media';

import ProductItem from '../Components/UIelements/ProductItem';
import ProductFilters from '../Components/UIelements/ProductFilters';

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
    showFilterMenu: false,
  };

  componentDidMount = () => {};

  render() {
    const { category } = this.props.match.params;
    const { type } = this.props.match.params;
    let products = this.state.products.map((product, index) => (
      <ProductItem details={product} key={index} />
    ));
    return (
      <>
        <div className={styles.products}>
          <span>{<Link to={'/'}>home / &#32;</Link>}</span>
          <span>
            {<Link to={`/${category}`}>{category} &#32;/ &#32;</Link>}
          </span>
          &#32;
          <span>{<Link to={`${category}/${type}`}>{type}</Link>}</span>
        </div>

        <div className={styles.typeandfilter}>
          <p className={styles.type}>
            {type}s &#127;<span>(21)</span>
          </p>
          <span
            onMouseEnter={() => this.setState({ showFilterMenu: true })}
            className={styles.filtericon}>
            <i class='fas fa-sort-amount-down-alt'></i>
          </span>

          <Media
            query='(max-width: 768px)'
            render={() => (
              <CSSTransition
                in={this.state.showFilterMenu}
                timeout={300}
                classNames='mobilefilter'
                unmountOnExit>
                <MobileProductFilterMenu />
              </CSSTransition>
            )}
          />
        </div>
        <Media query='(min-width: 768px)' render={() => <ProductFilters />} />
        <div className={styles.productitems}>{products}</div>
      </>
    );
  }
}
