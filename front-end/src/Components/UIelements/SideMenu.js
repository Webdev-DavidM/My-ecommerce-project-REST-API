import React, { Component } from 'react';
import styles from '../NavBar.module.css';
import { Link } from 'react-router-dom';

export default class SideMenu extends Component {
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
    setTimeout(() => {
      this.setState({
        showSubCat: true,
        selectedCat: e.target.textContent.toLowerCase(),
      });
    }, 0);
  };

  render() {
    let listOfCategories = Object.keys(this.state.categories);
    console.log(listOfCategories);

    return (
      <>
        <div
          className={styles.sidemenu}
          //   onMouseEnter={() => this.props.mouseEnter()}
          //   onMouseLeave={() => this.props.mouseLeave()}>
        >
          <div className={styles.sidecategories}>
            {listOfCategories.map((cat) => {
              let iconMove =
                this.state.selectedCat === cat ? styles.categoryItemMove : '';
              return (
                <div
                  onClick={() => this.props.closeSide()}
                  className={`${styles.categoryItem} ${iconMove} `}
                  onMouseEnter={(e) => this.showSubCategory(e)}>
                  <Link to={`/${cat}`}>{cat}</Link>
                  <i className={`fas fa-arrow-right ${iconMove}`}></i>
                </div>
              );
            })}
          </div>
          <div className={styles.sidesubcategories}>
            {this.state.showSubCat &&
              this.state.categories[this.state.selectedCat].map((subCat) => (
                <div onClick={() => this.props.closeSide()}>
                  <Link
                    to={`${
                      this.state.selectedCat
                    }/${subCat.trim().toLowerCase()}`}>
                    {subCat}
                  </Link>
                </div>
              ))}
          </div>
          <div
            className={styles.closebutton}
            onClick={() => this.props.closeSide()}
            style={{ width: '1.8rem', height: '1.8rem' }}>
            <i
              className='fas fa-window-close'
              style={{ width: '100%', height: 'auto' }}></i>
          </div>
        </div>
      </>
    );
  }
}
