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
