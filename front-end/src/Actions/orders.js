import axios from 'axios';

export const sendOrderToServer = (orderInfo) => {
  console.log(orderInfo);
  return async (dispatch) => {
    dispatch({ type: 'ORDER_SENT' });
    try {
      let response = await axios({
        method: 'post',
        url: `http://localhost:5000/orders/new-order`,
        data: {
          orderInfo,
        },
        headers: {
          token: orderInfo.token,
        },
      });
      if (response.status === 201) {
        console.log(response.data);
        dispatch({ type: 'ORDER_SUCCESS', products: response.data });
      }
    } catch (err) {
      dispatch({ type: 'ORDER_FAIL', error: err.response.data });
    }
  };
};

export const closeModal = () => {
  return { type: 'CLOSE_MODAL' };
};
