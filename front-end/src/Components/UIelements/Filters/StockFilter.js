import React, { Component } from 'react';
import styles from './StockFilter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default class StockFilter extends Component {
  state = {
    menu: false,
    inStockSelected: false,
  };

  dropdownMenu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  reset = () => {
    console.log('clicked');
    this.setState({ inStockSelected: false });
  };

  returnOnlyInStock = () => {
    this.setState({ inStockSelected: true });
    //here I will despatch this tp state to chage the selection
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

    let stockBtn = (
      <button
        className={styles.inputbtn}
        style={
          this.state.inStockSelected ? { backgroundColor: '#f1c40f' } : null
        }
        onClick={() => this.returnOnlyInStock()}
      />
    );

    return (
      <>
        <div class={styles.dropdown}>
          <div
            className={`${styles.dropbtn} ${dropbtnClicked}`}
            onClick={() => {
              this.dropdownMenu();
            }}>
            Stock &#127; &#127; &#127; &#127;
            {this.state.menu ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
          <div class={`${styles.dropdowncontent} ${dropdownClicked}`}>
            <div>
              {stockBtn}
              <span>&nbsp;&nbsp;&nbsp;In stock</span>

              <button
                disabled={!this.state.inStockSelected}
                className={styles.clearselection}
                onClick={() => this.reset()}>
                Reset
              </button>
              <br />
            </div>
          </div>
        </div>
      </>
    );
  }
}
