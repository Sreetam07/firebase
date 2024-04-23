export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const signUpRequest = (email: any, password: any) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password },
});

export const loginRequest = (email: any, password: any) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
  });
  
  export const addProductRequest = (product: any) => ({
    type: ADD_PRODUCT_REQUEST,
    payload: product,
  });
  
  export const editProductRequest = (productId: any, updatedProduct: any) => ({
    type: EDIT_PRODUCT_REQUEST,
    payload: { productId, updatedProduct },
  });
  
  export const deleteProductRequest = (productId: any) => ({
    type: DELETE_PRODUCT_REQUEST,
    payload: { productId },
  });
  
  export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
  });
  
  