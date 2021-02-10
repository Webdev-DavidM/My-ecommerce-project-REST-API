const initialState = {
  loading: false,
  products: [],
  showDropDownMenu: false,
  showSideMenu: false,
  chosenCategory: 'cycle',
  showSubCategory: false,
  chosenSubCategory: 'bikes',
  selectedProduct: [],
  basket: [],
  basketValue: 0,
  filteredBrands: [],
  reviewError: null,
  reviewSuccess: null,

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
    case 'FILTER_IN_STOCK':
      let productsCopyInStock = state.products.filter((product) => {
        return product.stock !== 0;
      });
      console.log(productsCopyInStock);
      return { ...state, products: productsCopyInStock };

    case 'CLEAR_PRODUCTS':
      return { ...state, products: [] };

    case 'CLEAR_REVIEW_STATUS':
      return { ...state, reviewError: null, reviewSuccess: null };

    case 'PRODUCTS_REQUESTED':
      return { ...state, loading: true };
    case 'REVIEW_SENT':
      return { ...state, loading: true, reviewError: null };
    case 'REVIEW_SUCCESS':
      return { ...state, loading: false, reviewSuccess: true };
    case 'REVIEW_FAIL':
      return {
        ...state,
        loading: false,
        reviewError: action.error,
        reviewSuccess: false,
      };

    case 'FILTERED_BRANDS':
      console.log(action.brands);
      return { ...state, filteredBrands: action.brands };
    case 'PRODUCTS_SUCCESS':
      return { ...state, products: action.products, loading: false };
    case 'PRODUCT_SUCCESS':
      return { ...state, selectedProduct: action.product, loading: false };

    case 'SORT_BY_BEST_REVIEWS':
      return { ...state, products: action.products };

    case 'PRODUCTS_FAIL':
      return { ...state, error: action.error, loading: false };
    case 'CHOSEN_BRAND':
      let productsByBrand = [...state.products];
      let products = productsByBrand.filter(
        (product) => product.brand === action.brand
      );
      return { ...state, products };
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
    case 'UPDATE_BASKET':
      let updateBasketCopy = [...state.basket];
      updateBasketCopy[action.noPos].quantity = action.quantity;
      return { ...state, basket: updateBasketCopy };
    case 'EMPTY_BASKET':
      return { ...state, basket: [] };
    case 'DELETE_ITEM_FROM_BASKET':
      let newBasketCopy = [...state.basket];
      console.log(action.id);
      let indexOfItem = newBasketCopy.findIndex(
        (item) => item.id === action.id
      );
      newBasketCopy.splice(indexOfItem, 1);
      return { ...state, basket: newBasketCopy };
    case 'SUB_CAT_SELECTED':
      return { ...state, chosenSubCategory: action.subcat };
    case 'CLEAR_SELECTED_PRODUCTS':
      return { ...state, selectedProduct: [] };
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
