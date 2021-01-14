import React, { Component } from 'react';
import styles from './ImageCarousel.module.css';
import ShopButton from './ShopButton';

export default class ImageCarousel extends Component {
  state = {
    currentImageIndex: 0,
    images: ['cycle-slide1.jpg', 'cycle-slide2.png'],
    moveright: false,
    moveleft: false,
  };

  moveRight() {
    console.log('clicked');
    this.setState({ moveright: true, moveleft: false });
  }

  moveLeft() {
    console.log('clicked');
    this.setState({ moveleft: true, moveright: false });
  }

  componentDidMount = () => {
    this.setState({ moveleft: true });
    this.carouselInterval();
  };

  carouselInterval = () => {
    setInterval(() => {
      this.setState((prevState) => ({
        moveleft: !prevState.moveleft,
        moveright: !prevState.moveright,
      }));
    }, 8000);
    setInterval(() => {
      this.setState({ showButton: true });
    }, 11000);
  };

  render() {
    let style = this.state.moveright ? styles.carouselmoveright : '';
    return (
      <>
        <div className={`${styles.carousel} ${style}`}>
          {this.state.images.map((url, index) => {
            console.log(index, url);
            return (
              <div key={index}>
                <span>
                  {index === 0 ? (
                    <span>BIKES</span>
                  ) : (
                    <span>LATEST 2021 MODELS</span>
                  )}

                  <ShopButton name='Shop Now' width='5rem' height='2rem' />
                </span>
                <img src={`${process.env.PUBLIC_URL}/images/${url}`} alt='' />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
