import React, { Component } from 'react';
import ImageCarousel from '../Components/UIelements/ImageCarousel';

export default class MainCategory extends Component {
  render() {
    return (
      <div>
        Category
        <ImageCarousel
          url={`${process.env.PUBLIC_URL}/images/landing-page-main-image.jpg`}
        />
      </div>
    );
  }
}
