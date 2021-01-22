import React, { Component } from 'react';
import styles from './PriceRangeFilter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class PriceRangeFilter extends Component {
  state = {
    menu: false,
    lowerPriceRange: 0,
    higherPriceRange: 0,
    selectedDropDown: '',
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  inputLowerPriceRange = (value) => {
    this.setState({ lowerPriceRange: value });
  };

  inputHigherPriceRange = (value) => {
    this.setState({ higherPriceRange: value });
  };

  submitValues = () => {
    //here I will dispatch to refilter the products based on the price range, I will do this later once
    // redux is set up
  };

  resetValues = () => {
    this.setState({
      lowerPriceRange: 0,
      higherPriceRange: 0,
    });
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });

    // here i will need to iterate over all the products to see what brands
    // there are then display, for now I will hard code in state
  };

  render() {
    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;
    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;

    return (
      <>
        <div class={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Price Range &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div class={`${styles.dropdowncontent} ${dropdownClicked}`}>
            <span>From</span>
            <div className={styles.inputvalues}>
              <span>£</span>
              <input
                type='text'
                value={this.state.lowerPriceRange}
                onChange={(e) => this.inputLowerPriceRange(e.target.value)}
              />
            </div>
            <span>To</span>
            <div className={styles.inputvalues}>
              <span>£</span>
              <input
                type='text'
                value={this.state.higherPriceRange}
                onChange={(e) => this.inputHigherPriceRange(e.target.value)}
              />
            </div>
            <button className={styles.applyprice}>Apply</button>
            <button className={styles.resetprice}> Reset</button>
          </div>
        </div>
      </>
    );
  }
}
