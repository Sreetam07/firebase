import * as actions from './actions';
interface User {
  id: string;
  email: string;
}

interface State {
  user: User | null;
  products: any[]; 
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  user: null,
  products: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action: { type: any; payload: any; }): State => {
    switch (action.type) {
        case actions.SIGN_UP_REQUEST:
        case actions.LOGIN_REQUEST:
        case actions.LOGOUT_REQUEST:
        case actions.ADD_PRODUCT_REQUEST:
        case actions.EDIT_PRODUCT_REQUEST:
        case actions.DELETE_PRODUCT_REQUEST:
        case actions.FETCH_PRODUCTS_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
    
        case actions.SIGN_UP_SUCCESS:
        case actions.LOGIN_SUCCESS:
          return {
            ...state,
            user: action.payload,
            loading: false,
            error: null,
          };
    
        case actions.LOGOUT_SUCCESS:
          return {
            ...state,
            user: null,
            loading: false,
            error: null,
          };
    
        case actions.ADD_PRODUCT_SUCCESS:
          return {
            ...state,
            products: [...state.products, action.payload],
            loading: false,
            error: null,
          };
    
        case actions.EDIT_PRODUCT_SUCCESS:
          return {
            ...state,
            products: state.products.map((product) =>
              product.id === action.payload.id ? action.payload : product
            ),
            loading: false,
            error: null,
          };
    
        case actions.DELETE_PRODUCT_SUCCESS:
          return {
            ...state,
            products: state.products.filter(
              (product) => product.id !== action.payload
            ),
            loading: false,
            error: null,
          };
    
        case actions.FETCH_PRODUCTS_SUCCESS:
          return {
            ...state,
            products: action.payload,
            loading: false,
            error: null,
          };
    
        case actions.SIGN_UP_FAILURE:
        case actions.LOGIN_FAILURE:
        case actions.LOGOUT_FAILURE:
        case actions.ADD_PRODUCT_FAILURE:
        case actions.EDIT_PRODUCT_FAILURE:
        case actions.DELETE_PRODUCT_FAILURE:
        case actions.FETCH_PRODUCTS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    
        default:
          return state;
      }
    };
    

export default rootReducer;
