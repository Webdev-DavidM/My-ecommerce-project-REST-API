import React, { Component } from 'react';
import styles from './PriceRange.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class PriceRange extends Component {
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

  render() {
    let dropdownClicked = this.state.menu ? styles.dropdownclicked : null;
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
            <button className={styles.apply}>Apply</button>
            <button className={styles.reset}> Reset</button>
          </div>
        </div>
      </>
    );
  }
}
