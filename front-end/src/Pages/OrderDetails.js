/* NPM packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* CSS */

import styles from './OrderDetails.module.css';

/* Components */

/* Action creators */

import { getIndividualOrder } from '../Actions/orders.js';
import { submitReview, clearReviewStatus } from '../Actions/products.js';

class OrderDetails extends Component {
  state = {
    rating: 0,
    review: '',
    stars: [1, 2, 3, 4, 5],
    reviewInProgress: false,
    productToReviewIndex: 0,
    error: null,
  };

  componentDidMount = () => {
    let { id } = this.props.match.params;
    let { getOrder } = this.props;
    getOrder(id);
  };

  componentWillUnmount = () => {
    this.setState({ error: null });
    this.props.clearStatus();
  };

  startReview = (index) => {
    this.props.clearStatus();
    this.setState({
      rating: 0,
      review: '',
      reviewInProgress: true,
      productToReviewIndex: index,
      error: null,
    });
  };

  updateError = {};

  submitReview = () => {
    let { submitUserReview, order } = this.props;
    console.log(order.user._id);

    if (this.state.review !== '' && this.state.rating !== 0) {
      this.setState({ error: null, reviewInProgress: false });
      let data = {
        productId: order.orderItems[this.state.productToReviewIndex].item,
        userId: order.user._id,
        firstName: order.user.firstName,
        rating: this.state.rating,
        comment: this.state.review,
      };
      submitUserReview(data);
    } else {
      this.setState({ error: 'Please giving a star rating and review' });
    }
  };

  render() {
    let { order } = this.props;
    console.log(this.props.error);

    return (
      <>
        {order !== null && (
          <>
            <span
              className={styles.gobackbtn}
              onClick={() => this.props.history.goBack()}>
              Go back
            </span>
            <h2 className={styles.heading}>Order {order._id}</h2>
            <div className={styles.orderscontainer}>
              <div className={styles.shippingpaymentcontainer}>
                <h3>SHIPPING</h3>

                <div className={styles.status}>{order.status}</div>
                <div className={styles.hr}></div>
                <h3>PAYMENT</h3>
                <span>Method: Paypal</span>
                <div className={styles.status}>Paid</div>
              </div>
              <div className={styles.orderitemscontainer}>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <>
                    <div className={styles.itemdetails}>
                      <div>
                        <span className={styles.details}>{item.name}</span>
                        <span className={styles.details}>
                          &nbsp;:&nbsp;quantity&nbsp;{item.qty} x £{item.price}{' '}
                          = £{item.price * item.qty}
                        </span>
                        {this.props.reviewSuccess &&
                        this.state.productToReviewIndex === index ? (
                          <p className={styles.reviewsuccess}>
                            Reviewed successfully
                          </p>
                        ) : null}
                        {this.props.error &&
                        this.state.productToReviewIndex === index ? (
                          <p className={styles.reviewfail}>
                            {this.props.error}
                          </p>
                        ) : null}
                      </div>

                      {!this.state.reviewInProgress && (
                        <span
                          className={styles.reviewbtn}
                          onClick={() => this.startReview(index)}>
                          Submit a review
                        </span>
                      )}
                    </div>
                    {this.state.reviewInProgress &&
                      this.state.productToReviewIndex === index && (
                        <>
                          <div className={styles.reviewcontainer}>
                            <div>Rating</div>
                            <div>
                              {this.state.stars.map((star) => {
                                let color =
                                  this.state.rating >= star
                                    ? {
                                        color: '#f1c40f',
                                      }
                                    : null;

                                return (
                                  <span
                                    className={styles.star}
                                    onClick={() =>
                                      this.setState({ rating: star })
                                    }
                                    style={color}>
                                    <i className='fas fa-star'></i>
                                  </span>
                                );
                              })}
                            </div>

                            <div>Review</div>
                            <div>
                              <input
                                onChange={(e) =>
                                  this.setState({ review: e.target.value })
                                }
                                value={this.state.review}
                                className={styles.review}
                                type='textarea'
                              />
                            </div>
                            <span
                              className={styles.submitreviewbtn}
                              onClick={() => this.submitReview()}>
                              Submit your review
                            </span>

                            {this.state.error && (
                              <span
                                className={styles.submitreviewbtn}
                                style={{ backgroundColor: '#e74c3c' }}>
                                {this.state.error}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                  </>
                ))}
              </div>

              <div className={styles.ordersummarycontainer}>
                <h3>ORDER SUMMARY</h3>
                <span>Items: £{order.total}</span>
                <span>Delivery: £49</span>
                <span>Total £{order.total + 49}</span>
                <span>
                  Name: {order.user.firstName} {order.user.lastName}
                </span>
                <span>Email: {order.user.email}</span>
                <span>Address: {order.user.address}</span>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    order: state.orders.order,
    error: state.products.reviewError,
    reviewSuccess: state.products.reviewSuccess,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(getIndividualOrder(id)),
    submitUserReview: (data) => dispatch(submitReview(data)),
    clearStatus: () => dispatch(clearReviewStatus()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
);
