import React, { Component } from 'react';
import styles from './BestSellingFilter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class BestSellingFilter extends Component {
  state = {
    menu: false,
    categories: [
      'Best Selling',
      'Price: low to high',
      'Price: high to low',
      'Customer reviews',
    ],
    selectedDropDown: '',
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  dropdownSelected = (name) => {
    this.setState((prevState) => ({
      selectedDropDown: name,
    }));
  };

  componentDidMount = () => {
    this.props.mobile && this.setState({ menu: true });
  };

  render() {
    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;
    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;

    let buttons = this.state.categories.map((category) => {
      return (
        <div>
          <button
            className={styles.inputbtn}
            name={category}
            style={
              this.state.selectedDropDown === category
                ? { backgroundColor: '#f1c40f' }
                : null
            }
            onClick={() => this.dropdownSelected(category)}
          />
          <span>&nbsp;&nbsp;&nbsp;{category}</span>
          <br />
        </div>
      );
    });

    return (
      <>
        <div class={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Best selling &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div class={`${styles.dropdowncontent} ${dropdownClicked}`}>
            {buttons}
            <button className={styles.resetbest}> Reset</button>
          </div>
        </div>
      </>
    );
  }
}
