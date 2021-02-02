import axios from 'axios';

export const getProducts = (category) => {
  return async (dispatch) => {
    dispatch({ type: 'PRODUCTS_REQUESTED' });
    console.log(category);
    try {
      let response = await axios(`http://localhost:5000/products/${category}`);
      if (response.status === 200) {
        dispatch({ type: 'PRODUCTS_SUCCESS', products: response.data });
      }
    } catch (err) {
      dispatch({ type: 'PRODUCTS_FAIL', error: err.response.data });
    }
  };
};

export const selectedCategory = (category) => {
  return { type: 'CATEGORY_CHOSEN', category };
};

export const showDrop = (bool) => {
  return { type: 'SHOW_DROP_DOWN', bool };
};

export const showSide = (bool) => {
  return { type: 'SHOW_SIDE_MENU', bool };
};

export const showSubCategory = (bool) => {
  return { type: 'SHOW_SUB_CATEGORY', bool };
};

export const subCatToShow = (subcat) => {
  return { type: 'SUB_CAT_SELECTED', subcat };
};

export const chosenProduct = (id) => {
  return { type: 'CHOSEN_PRODUCT', id };
};

export const addToBasket = (itemInfo) => {
  return { type: 'ADD_TO_BASKET', itemInfo };
};

export const sortByBestReviews = () => {
  return { type: 'FILTER_BEST_REVIEWS' };
};

export const sortViaPriceRange = (lower, higher) => {
  return { type: 'FILTER_PRICE_RANGE', lower, higher };
};
