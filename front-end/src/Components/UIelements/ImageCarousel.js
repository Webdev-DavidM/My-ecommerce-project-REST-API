import React, { Component } from 'react';
import styles from './ImageCarousel.module.css';
export default class ImageCarousel extends Component {
  state = {
    currentImageIndex: 0,
    images: [
      'https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900',
      'https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328',
    ],
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
    }, 5000);
  };

  //   previousSlide = () => {
  //     const lastIndex = imgUrls.length - 1;
  //     const { currentImageIndex } = this.state;
  //     const shouldResetIndex = currentImageIndex === 0;
  //     const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

  //     this.setState({
  //       currentImageIndex: index,
  //     });
  //   };

  //   nextSlide = () => {
  //     const lastIndex = imgUrls.length - 1;
  //     const { currentImageIndex } = this.state;
  //     const shouldResetIndex = currentImageIndex === lastIndex;
  //     const index = shouldResetIndex ? 0 : currentImageIndex + 1;

  //     this.setState({
  //       currentImageIndex: index,
  //     });
  //   };

  render() {
    let style = this.state.moveright ? styles.carouselmoveright : '';
    return (
      <>
        <div className={`${styles.carousel} ${style}`}>
          {this.state.images.map((url, index) => {
            console.log(index, url);
            return (
              <div key={index}>
                <img src={`${url}`} alt='' />
              </div>
            );
          })}
        </div>

        <button onClick={() => this.moveRight()}>Click to Right</button>
        <button onClick={() => this.moveLeft()}>Click to Left</button>
      </>
    );
  }
}
