import axios from 'axios';

export const getProducts = (category) => {
  return async (dispatch) => {
    dispatch({ type: 'PRODUCTS_REQUESTED' });
    try {
      let response = await axios(`http://localhost:5000/products/${category}`);
      if (response.status === 200) {
        console.log(response.data);
        dispatch({ type: 'PRODUCTS_SUCCESS', products: response.data });
      }
    } catch (err) {
      dispatch({ type: 'PRODUCTS_FAIL', error: err.response.data });
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'PRODUCTS_REQUESTED' });
    try {
      let response = await axios(
        `http://localhost:5000/products/product/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        dispatch({ type: 'PRODUCT_SUCCESS', product: response.data });
      }
    } catch (err) {
      dispatch({ type: 'PRODUCTS_FAIL', error: err.response.data });
    }
  };
};

export const clearProducts = () => {
  return { type: 'CLEAR_PRODUCTS' };
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

export const updateToBasket = (noPos, quantity) => {
  console.log(noPos, quantity);
  return { type: 'UPDATE_BASKET', noPos, quantity };
};

export const sortByBestReviews = () => {
  return { type: 'FILTER_BEST_REVIEWS' };
};

export const sortViaPriceRange = (lower, higher) => {
  return { type: 'FILTER_PRICE_RANGE', lower, higher };
};

export const showInStock = () => {
  return { type: 'FILTER_IN_STOCK' };
};

export const productBrands = (brands) => {
  return { type: 'FILTERED_BRANDS', brands };
};

export const chosenBrand = (brand) => {
  getProducts();
  return { type: 'CHOSEN_BRAND', brand };
};

export const deleteItemFromBasket = (id) => {
  return { type: 'DELETE_ITEM_FROM_BASKET', id };
};
