const initialState = {
  loading: false,
  orders: [],
  showOrdersModal: false,
  errors: null,
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_SENT':
      return { loading: true };
    case 'ORDER_SUCCESS':
      return { loading: false, showOrdersModal: true };
    case 'ORDER_FAIL':
      return { loading: false, showOrdersModal: true };
    case 'CLOSE_MODAL':
      return { showOrdersModel: false };

    default:
      return state;
  }
}

export default ordersReducer;
