const initialState = {
  loading: false,
  products: [],
  showDropDownMenu: false,
  showSideMenu: false,
  chosenCategory: 'cycle',
  showSubCategory: false,
  chosenSubCategory: 'bikes',

  categories: {
    cycle: {
      bikes: ['Mountain bikes', 'Hybrid bikes', 'Road bikes'],
      helmets: ['Helmets', 'Protection'],
    },

    run: {
      clothing: ['Tops', 'Legwear', 'Jackets'],
      footwear: ['Running Shoes', 'Trail Shoes'],
    },

    swim: {
      shorts: ['Swimming shorts', 'Swimming briefs'],
      swimsuits: ['One piece', 'Two piece'],
    },

    outdoors: {
      clothing: ['Tops', 'Legwear'],
      footWear: ['Trail shoes', 'Boots'],
    },
  },
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'PRODUCTS_REQUESTED':
      return { ...state, loading: true };
    case 'PRODUCTS_SUCCESS':
      return { ...state, products: action.products, loading: false };
    case 'PRODUCTS_FAIL':
      return { ...state, error: action.error, loading: false };
    case 'CATEGORY_CHOSEN':
      return { ...state, chosenCategory: action.category };
    case 'SHOW_DROP_DOWN':
      return { ...state, showDropDownMenu: action.bool };
    case 'SHOW_SIDE_MENU':
      return { ...state, showSideMenu: action.bool };
    case 'SHOW_SUB_CATEGORY':
      return { ...state, showSubCategory: action.bool };
    case 'SUB_CAT_SELECTED':
      console.log(action.subcat);
      return { ...state, chosenSubCategory: action.subcat };

    default:
      return state;
  }
}

export default productsReducer;
