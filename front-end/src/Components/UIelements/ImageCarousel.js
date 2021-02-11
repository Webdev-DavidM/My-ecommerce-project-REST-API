/* NPM packages */
import React, { Component } from 'react';

/* css */
import styles from './ImageCarousel.module.css';

export default class ImageCarousel extends Component {
  state = {
    currentImageIndex: 0,
    moveright: false,
    moveleft: false,
  };

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
          {this.props.url.map((image, index) => {
            return (
              <div key={index}>
                <span>
                  {index === 0 ? (
                    <span>{this.props.cat.toUpperCase()}</span>
                  ) : (
                    <span>2021 RANGE IN STOCK</span>
                  )}
                </span>
                <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt='' />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
