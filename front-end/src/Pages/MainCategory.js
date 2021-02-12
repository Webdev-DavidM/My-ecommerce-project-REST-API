/* NPM packages */

import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* CSS */

import styles from './MainCategory.module.css';

/* Components */

import ImageCarousel from '../Components/UIelements/ImageCarousel';

/* Action creators */
import { getProducts, clearProducts } from '../Actions/products.js';

class MainCategory extends Component {
  componentDidMount = () => {
    this.props.clearOldProducts();
    let category = this.props.match.url;
    category = category.substring(1);
    this.props.getUserProducts(category);
  };

  componentWillUnmount = () => {
    this.props.clearOldProducts();
  };

  render() {
    let { categories, products } = this.props;
    let category = this.props.match.url;
    category = category.substring(1);
    let categoriesToShow = categories[category];
    let categoryArray = Object.keys(categoriesToShow);
    let images = [];
    if (category === 'cycle') {
      images.push('cycle-slide1.jpg', 'cycle-slide2.png');
    }
    if (category === 'run') {
      images.push('running-image1.jpg', 'AsicsGel:image1.jpg');
    }
    if (category === 'swim') {
      images.push('swimming-image1.jpg', 'adidas-Beach-Women-Short:image1.jpg');
    }

    return (
      <div className={styles.maincategory}>
        <ImageCarousel url={images} cat={category} />
        <div className={styles.categoryheader}>
          <p>
            DM sports / <strong>{category}</strong>
          </p>

          {category === 'cycle' && (
            <p>
              {' '}
              Welcome to one of the worlds best online bike shops. Offering
              sleek road bikes, trail-taming MTBs, agile BMXs, and nimble
              commuter bikes, our range of tuned and tested bikes is perfect for
              leisure or professional competition. With the latest bike parts
              and components from top brands, your bike will be in peak
              condition. Or choose from incredible bike clothing from the likes
              of dhb, featuring this season’s cycling shoes, jerseys, bib shorts
              and much more.'{' '}
            </p>
          )}
          {category === 'run' && (
            <p>
              {' '}
              DM sport’s online running shop has an incredible range of running
              gear and accessories, featuring the best brands and latest
              equipment for every kind of runner. Our running shoes span
              pronation-specific running trainers, track shoes, trail shoes, and
              more. For sports clothing, you’ll find this season’s latest
              running clothes and compression wear from leading brands, all
              replete with features and style. The range also sports the latest
              GPS running watches and running tech such as top running lights.
              Or browse our running accessories with running backpacks and
              running bags, nutrition for runners, post run recovery ideas, and
              a section dedicated to finding the perfect gift for runners.
            </p>
          )}
          {category === 'swim' && (
            <p>
              {' '}
              Immerse yourself in the most comprehensive range of swimwear and
              swimming accessories you’ll find anywhere with DM sport's
              dedicated swimshop. Dive into the vast range of mens and womens
              swimming costumes, wetsuits, swimming shorts, and jammers, from
              performance grade to club level, and including attractive leisure
              options. From the latest swimming goggles - ranging from budget to
              professional - to quality swim bags perfect for quick dips or
              elite triathlon stages, DM sport’s choice of top brands and
              exceptional prices makes it an essential stop for all things swim.
            </p>
          )}
        </div>
        <div className={styles.categorybody}>
          <aside>
            {categoryArray.map((section, index) => {
              return (
                <div key={index}>
                  <p className={styles.heading}>{section}</p>
                  <hr></hr>
                  <ul>
                    {categoriesToShow[section].map((subcat, index) => {
                      return (
                        <li key={index}>
                          <Link to={`/${category}/${section}/${subcat}`}>
                            {subcat}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </aside>
          <main>
            {
              // Here I will get the user products and map over them use the images for the interactive image gallery
            }
            <div className={styles.category}>
              {categoryArray.map((section, index) => {
                return (
                  <div key={index} className={styles.catcontainer}>
                    {categoriesToShow[section].map((subcat, index) => {
                      let image = products.filter(
                        (product) => product.subcategory === subcat
                      );

                      if (image.length !== 0) {
                        image = image[0].images[0];
                      }

                      return (
                        <div
                          key={index}
                          className={styles.imgcontainer}
                          onClick={() =>
                            this.props.history.push(
                              `/${category}/${section}/${subcat}`
                            )
                          }>
                          <img src={`http://localhost:5000/${image}`} alt='' />
                          <div className={styles.catoverlay}>
                            <span>{subcat}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
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
    clearOldProducts: () => dispatch(clearProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCategory);
