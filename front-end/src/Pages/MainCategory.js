/* NPM packages */

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */

import styles from './MainCategory.module.css';

/* Components */

import ImageCarousel from '../Components/UIelements/ImageCarousel';

/* Action creators */
import { getProducts } from '../Actions/products.js';

class MainCategory extends Component {
  componentDidMount = () => {
    let { category } = this.props.match.params;
    this.props.getUserProducts(category);
  };

  render() {
    let { categories, products } = this.props;
    let { category } = this.props.match.params;
    let categoriesToShow = categories[category];
    let categoryArray = Object.keys(categoriesToShow);

    return (
      <div className={styles.maincategory}>
        <ImageCarousel
          url={`${process.env.PUBLIC_URL}/images/landing-page-main-image.jpg`}
        />
        <div className={styles.categoryheader}>
          <p>
            DM sports / <strong>Cycle</strong>
          </p>
          <p>
            {' '}
            Welcome to one of the world’s best online bike shops. Offering sleek
            road bikes, trail-taming MTBs, agile BMXs, and nimble commuter
            bikes, our range of tuned and tested bikes is perfect for leisure or
            professional competition. With the latest bike parts and components
            from top brands, your bike will be in peak condition. Or choose from
            incredible bike clothing from the likes of dhb, featuring this
            season’s cycling shoes, jerseys, bib shorts and much more.
          </p>
        </div>
        <div className={styles.categorybody}>
          <aside>
            {categoryArray.map((section) => {
              return (
                <>
                  <p className={styles.heading}>{section}</p>
                  <hr></hr>
                  <ul>
                    {categoriesToShow[section].map((subcat) => {
                      return (
                        <li>
                          <Link to={`/${category}/${section}/${subcat}`}>
                            {subcat}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              );
            })}
          </aside>
          <main>
            {
              // Here I will get the user products and map over them use the images for the interactive image gallery
            }
            <div className={styles.category}>
              {categoryArray.map((section) => {
                return (
                  <>
                    {categoriesToShow[section].map((subcat) => {
                      let image = products.filter(
                        (product) => product.subcategory === subcat
                      );

                      if (image.length !== 0) {
                        image = image[0].images[0];
                      }

                      return (
                        <div
                          className={styles.imgcontainer}
                          onClick={() =>
                            this.props.history.push(
                              `/${category}/${section}/${subcat}`
                            )
                          }>
                          <img src={`http://localhost:5000/${image}`} alt='' />
                          <div>
                            <span>{subcat}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })}
              <img
                src={`${process.env.PUBLIC_URL}/images/cycle-slide1.jpg`}
                alt=''
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // get the category names for the catgeoyr being dispayed
  return {
    categories: state.products.categories,
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProducts: (category) => dispatch(getProducts(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCategory);
