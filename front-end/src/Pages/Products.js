/* NPM packages */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

/* CSS */

import styles from './Products.module.css';

/* Components */

import MobileProductFilterMenu from '../Components/UIelements/MobileProductFilterMenu';
import ProductItem from '../Components/UIelements/ProductItem';
import ProductFilters from '../Components/UIelements/ProductFilters';

/* Action creators */
import { getProducts } from '../Actions/products.js';

class Products extends Component {
  state = {
    showFilterMenu: false,
  };

  componentDidMount = () => {
    let { category } = this.props.match.params;
    console.log(category);
    this.props.getUserProducts(category);
  };

  render() {
    // const { category } = this.props.match.params;
    // const { type } = this.props.match.params;
    // let products = this.state.products.map((product, index) => (
    //   <ProductItem details={product} key={index} />
    // ));
    return (
      <>
        <div className={styles.products}>
          {/* <span>{<Link to={'/'}>home / &#32;</Link>}</span>
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
          </span> */}

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
        {/* <div className={styles.productitems}>{products}</div> */}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProducts: (category) => dispatch(getProducts(category)),
  };
};

export default connect(null, mapDispatchToProps)(Products);
