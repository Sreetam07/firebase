export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const signUpRequest = (email: any, password: any) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password },
});

export const loginRequest = (email: any, password: any) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

