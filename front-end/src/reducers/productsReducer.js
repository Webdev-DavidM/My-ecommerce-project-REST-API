const initialState = {
  loading: false,
  products: [],
  showDropDownMenu: false,
  showSideMenu: false,
  chosenCategory: 'cycle',
  showSubCategory: false,
  chosenSubCategory: 'bikes',
  selectedProduct: null,
  basket: [],
  basketValue: 0,

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
    case 'FILTER_PRICE_RANGE':
      let productsCopy = state.products.filter((product) => {
        return (product.price > action.lower) & (product.price < action.higher);
      });
      return { ...state, products: productsCopy };

    case 'SUB_CAT_SELECTED':
      return { ...state, chosenSubCategory: action.subcat };
    case 'ADD_TO_BASKET':
      let basketCopy = [...state.basket];
      basketCopy.push(action.itemInfo);
      //This calculation below gives the total value of the cart whic is
      // by the basket UI to shown the amount
      let totalBasketValue =
        state.basket.length === 0
          ? action.itemInfo.price
          : action.itemInfo.price +
            state.basket.reduce((total, basketItem) => {
              return total + basketItem.price * basketItem.quantity;
            }, action.itemInfo.price);
      return { ...state, basket: basketCopy, basketValue: totalBasketValue };
    case 'CHOSEN_PRODUCT':
      let product = state.products.filter(
        (product) => product._id === action.id
      );
      return { ...state, selectedProduct: product[0] };

    default:
      return state;
  }
}

export default productsReducer;
