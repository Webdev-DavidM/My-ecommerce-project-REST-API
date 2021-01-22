import styles from './MobileProductFilterMenu.module.css';
import React, { Component } from 'react';
import BestSellingFilter from '../UIelements/Filters/BestSellingFilter';
import PriceRangeFilter from '../UIelements/Filters/PriceRangeFilter';
import StockFilter from '../UIelements/Filters/StockFilter';
import BrandFilter from '../UIelements/Filters/BrandFilter';

export default class MobileProductFilterMenu extends Component {
  state = {
    chosenFilter: '',
    filters: ['Best selling', 'Price range', 'Stock', 'Brand'],
  };

  componentDidMount = () => {
    // get the filter from from redux
  };

  render() {
    let filterToShow;

    switch (this.state.chosenFilter) {
      case 'Best selling':
        filterToShow = <BestSellingFilter mobile={true} showDropDown={true} />;
        break;
      case 'Price range':
        filterToShow = <PriceRangeFilter mobile={true} showDropDown={true} />;
        break;
      case 'Stock':
        filterToShow = <StockFilter mobile={true} showDropDown={true} />;
        break;
      case 'Brand':
        filterToShow = <BrandFilter mobile={true} showDropDown={true} />;
        break;
      default:
        filterToShow = null;
    }

    let options = this.state.filters.map((filter, index) => {
      return (
        <div className={styles.filtercat} key={index}>
          <button
            onClick={() => this.setState({ chosenFilter: filter })}
            className={styles.filterbtn}
            style={
              this.state.chosenFilter === filter
                ? { backgroundColor: '#f1c40f' }
                : null
            }
          />
          <span className={styles.filterdesc}>{filter}</span>
        </div>
      );
    });
    return (
      <div className={styles.mobilefilter}>
        <div className={styles.optionscontainer}>
          {this.state.chosenFilter === '' ? (
            options
          ) : (
            <div className={styles.importedfilter}>{filterToShow}</div>
          )}
        </div>
      </div>
    );
  }
}
