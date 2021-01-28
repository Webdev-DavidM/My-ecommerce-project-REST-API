const initialState = {
  loading: false,
  products: [],
  categories: [
    {
      cycle: {
        bikes: ['Mountain bikes', 'Hybrid bikes', 'Road bikes'],
        helmets: ['Helmets', 'Protection'],
      },
    },
    {
      run: {
        clothing: ['Tops', 'Legwear', 'Jackets'],
        footwear: ['Running Shoes', 'Trail Shoes'],
      },
    },
    {
      swim: {
        swimShorts: ['Swimming shorts', 'Swimming briefs'],
        swimSuit: ['One piece', 'Two piece'],
      },
    },
    {
      outdoors: {
        clothing: ['Tops', 'Legwear'],
        footWear: ['Trail shoes', 'Boots'],
      },
    },
  ],
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'PRODUCTS_REQUESTED':
      return { ...state, loading: true };
    case 'PRODUCTS_SUCCESS':
      return { ...state, products: action.products, loading: false };
    case 'PRODUCTS_FAIL':
      console.log(action);
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
}

export default productsReducer;
