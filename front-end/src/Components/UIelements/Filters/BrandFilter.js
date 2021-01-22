import React, { Component } from 'react';
import styles from './BrandFilter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class BrandFilter extends Component {
  state = {
    menu: false,
    brands: ['vitus', 'specialised', 'raleigh', 'awesome'],
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

    // here i will need to iterate over all the products to see what brands
    // there are then display, for now I will hard code in state
  };

  render() {
    let dropdownClicked =
      this.state.menu || this.props.showDropDown
        ? styles.dropdownclicked
        : null;
    let dropbtnClicked = this.state.menu ? styles.dropbtnclicked : null;

    let brands = this.state.brands.map((category) => {
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
            Brands &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div class={`${styles.dropdowncontent} ${dropdownClicked}`}>
            {brands}
            <button className={styles.clearbrand}> Reset</button>
          </div>
        </div>
      </>
    );
  }
}
