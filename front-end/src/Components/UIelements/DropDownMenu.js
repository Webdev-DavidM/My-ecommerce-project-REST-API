import React, { Component } from 'react';
import styles from '../NavBar.module.css';
import { Link } from 'react-router-dom';

export default class DropDownMenu extends Component {
  state = {
    categories: {
      bikes: ['Road Bike', 'Mountain Bike', 'BMX Bike'],
      helmets: ['Children helmets', "Men's helmets", "Women's helmets"],
    },
    showSubCat: false,
    selectedCat: '',
  };

  componentDidMount = () => {
    // get the categories from redux
  };

  showSubCategory = (e) => {
    this.setState({
      showSubCat: true,
      selectedCat: e.target.textContent.toLowerCase(),
    });
  };

  render() {
    let listOfCategories = Object.keys(this.state.categories);
    console.log(this.props);

    return (
      <div
        onClick={() => this.props.closeMain()}
        className={styles.dropdown}
        onMouseEnter={() => this.props.mouseEnter()}
        onMouseLeave={() => this.props.mouseLeave()}>
        <div className={styles.categories}>
          {listOfCategories.map((cat) => {
            let iconMove =
              this.state.selectedCat === cat ? styles.categoryItemMove : '';
            return (
              <div
                // onClick={() => this.props.close}
                className={`${styles.categoryItem} ${iconMove} `}
                onMouseEnter={(e) => this.showSubCategory(e)}>
                <Link to={`/${cat}`}>{cat}</Link>
                <i className={`fas fa-arrow-right ${iconMove}`}></i>
              </div>
            );
          })}
        </div>
        <div className={styles.subcategories}>
          {this.state.showSubCat &&
            this.state.categories[this.state.selectedCat].map((subCat) => (
              <div onClick={() => this.setState({})}>
                <Link
                  to={`${
                    this.state.selectedCat
                  }/${subCat.trim().toLowerCase()}`}>
                  {subCat}
                </Link>
              </div>
            ))}
        </div>
        <div className={styles.categoryImage}>
          <img
            src={`${process.env.PUBLIC_URL}/images/fitness-photo.jpg`}
            alt='fitness'></img>
        </div>
      </div>
    );
  }
}
