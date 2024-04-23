import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
  } from '../actions/productActions';
  
  const initialState = {
    products: [],
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          products: [...state.products, action.payload],
          error: null,
        };
      case ADD_PRODUCT_FAILURE:
      case EDIT_PRODUCT_FAILURE:
      case DELETE_PRODUCT_FAILURE:
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case EDIT_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.id ? action.payload : product,
          ),
          error: null,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.filter(
            product => product.id !== action.payload,
          ),
          error: null,
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  