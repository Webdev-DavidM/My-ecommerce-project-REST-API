import React, { Component } from 'react';

class Reviews extends Component {
  state = {
    showReviews: false,
    averageReviewRating: null,
    stars: [1, 2, 3, 4, 5],
  };

  componentDidMount = () => {
    let { reviews } = this.props;
    console.log(reviews);
    let averageRating =
      reviews.reduce((a, b) => {
        return a.rating + b.rating;
      }) / reviews.length;
    this.setState({ averageReviewRating: averageRating });
  };

  render() {
    let { reviews } = this.props;
    return (
      <div>
        {this.state.stars.map((star) => {
          let colour =
            star <= this.state.averageReviewRating ? '#f1c40f' : null;
          return <i class='fas fa-star' style={{ color: `${colour}` }}></i>;
        })}
        &nbsp; ({reviews.length})
        {reviews.length === 0 && (
          <span>(0) Be the first to review this product</span>
        )}
      </div>
    );
  }
}

export default Reviews;
