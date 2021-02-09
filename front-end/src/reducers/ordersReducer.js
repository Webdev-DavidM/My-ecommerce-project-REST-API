const initialState = {
  loading: false,
  orders: [],
  order: null,
  showOrdersModal: false,
  errors: null,
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_SENT':
      return { ...state, loading: true };
    case 'ORDER_SUCCESS':
      return { ...state, loading: false, showOrdersModal: true };
    case 'ORDER_LIST_RECEIVED':
      return { ...state, loading: false, orders: action.orders };
    case 'ORDER_FAIL':
      return { ...state, loading: false, showOrdersModal: true };
    case 'INDIVDUAL_ORDER_SUCCESS':
      return { ...state, loading: false, order: action.order[0] };

    case 'CLOSE_MODAL':
      return { ...state, showOrdersModel: false };

    default:
      return state;
  }
}

export default ordersReducer;
