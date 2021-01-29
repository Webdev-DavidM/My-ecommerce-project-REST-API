import axios from 'axios';

export const getProducts = (category) => {
  return async (dispatch) => {
    dispatch({ type: 'PRODUCTS_REQUESTED' });
    console.log(category);
    try {
      let response = await axios(`products/${category}`);
      if (response.status === 200) {
        console.log(response);
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