import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
  } from '../actions/authActions';
  
  const initialState = {
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_UP_SUCCESS:
      case LOGIN_SUCCESS:
        return { ...state, user: action.payload, error: null };
      case SIGN_UP_FAILURE:
      case LOGIN_FAILURE:
        return { ...state, error: action.payload };
      case LOGOUT_SUCCESS:
        return { ...state, user: null, error: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  