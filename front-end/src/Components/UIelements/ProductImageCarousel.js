/* NPM packages */
import React, { Component } from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './ProductImageCarousel.module.css';

class ProductImageCarousel extends Component {
  state = {
    productId: '',
    selectedImage: 0,
  };

  moveImageByArrow = (direction) => {
    if (direction === 'left' && this.state.selectedImage !== 0) {
      return this.setState((prevState) => ({
        selectedImage: prevState.selectedImage - 1,
      }));
    } else if (
      direction === 'right' &&
      this.state.selectedImage !== this.state.images.length - 1
    ) {
      return this.setState((prevState) => ({
        selectedImage: prevState.selectedImage + 1,
      }));
    }
  };

  moveImagesByDot = (index) => {
    this.setState((prevState) => ({
      selectedImage: index,
    }));
  };

  render() {
    let { images } = this.props.product;

    let imageButtons = images.map((image, index) => (
      <span
        className={styles.dot}
        onClick={() => this.moveImagesByDot(index)}
        style={
          index === this.state.selectedImage
            ? { backgroundColor: '#f1c40f' }
            : null
        }></span>
    ));

    let imageGallery = images.map((image, index) => (
      <span
        key={index}
        onClick={() => this.moveImagesByDot(index)}
        style={
          index === this.state.selectedImage
            ? { border: '3px solid #f1c40f' }
            : null
        }>
        <img src={`http://localhost:5000${image}`} alt={'hello'}></img>
      </span>
    ));

    return (
      <>
        <div className={styles.slideshowcontainer}>
          <div className={`${styles.myslides} ${styles.fade}`}>
            <button
              disabled={this.state.selectedImage === 0}
              className={styles.prev}
              onClick={() => this.moveImageByArrow('left')}>
              <i className='fas fa-angle-left'></i>
            </button>
            <img
              src={`http://localhost:5000/${images[this.state.selectedImage]}`}
              alt={'hello'}></img>
            <button
              className={styles.next}
              onClick={() => this.moveImageByArrow('right')}>
              <i className='fas fa-angle-right'></i>
            </button>
          </div>
        </div>
        <br></br>
        <div style={{ textAlign: 'center' }}>
          {' '}
          <i className='fas fa-angle-left'></i> &nbsp;
          {this.state.selectedImage + 1} &nbsp; / &nbsp; {images.length} &nbsp;
          <i className='fas fa-angle-right'></i>
        </div>
        <Media
          query={'(max-width: 768px)'}
          render={() => (
            <div style={{ textAlign: 'center' }}>{imageButtons}</div>
          )}
        />
        <Media
          query={'(min-width: 768px)'}
          render={() => (
            <div
              className={styles.imagegallery}
              style={{ textAlign: 'center' }}>
              {imageGallery}
            </div>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.selectedProduct,
  };
};

export default withRouter(connect(mapStateToProps)(ProductImageCarousel));
