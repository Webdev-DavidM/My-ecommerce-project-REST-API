import React, { Component } from 'react';

import styles from './Reviews.module.css';
import { CSSTransition } from 'react-transition-group';

class Reviews extends Component {
  state = {
    showReviews: false,
    averageReviewRating: null,
    stars: [1, 2, 3, 4, 5],
  };

  componentDidMount = () => {
    let { reviews } = this.props;
    let averageRating =
      reviews.reduce((a, b) => {
        return a.rating + b.rating;
      }) / reviews.length;
    this.setState({ averageReviewRating: averageRating });
  };

  render() {
    let { reviews } = this.props;

    return (
      <div
        className={styles.reviewcontainer}
        onClick={() =>
          this.setState((prevState) => ({
            showReviews: !prevState.showReviews,
          }))
        }>
        {this.state.stars.map((star, index) => {
          let colour =
            star <= this.state.averageReviewRating ? '#f1c40f' : null;
          return (
            <i
              key={index}
              className='fas fa-star'
              style={{ color: `${colour}` }}></i>
          );
        })}
        &nbsp; ({reviews.length})<span>&nbsp;Click for review details</span>
        {reviews.length === 0 && (
          <span>(0) Be the first to review this product</span>
        )}
        <CSSTransition
          in={this.state.showReviews}
          timeout={400}
          classNames='reviews'
          unmountOnExit>
          <div>
            {reviews.map((review, index) => {
              let stars = this.state.stars.map((star) => {
                let colour = star <= review.rating ? '#f1c40f' : null;
                return (
                  <i
                    key={index}
                    className='fas fa-star'
                    style={{ color: `${colour}` }}></i>
                );
              });
              return (
                <div>
                  <hr className={styles.reviewdivider} />
                  {stars} by {review.firstName}
                  <br />
                  {review.comment}
                </div>
              );
            })}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Reviews;
