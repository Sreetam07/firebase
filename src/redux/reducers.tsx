export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const signUpRequest = (email: string, password: string) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password },
});

export const loginRequest = (email: string, password: string) => {
    if (!email || !password) {
      return {
        type: LOGIN_FAILURE,
        payload: "Email and password are required.",
      };
    }
  
    return {
      type: LOGIN_REQUEST,
      payload: { email, password },
    };
  };
  

export type AuthActionTypes =
  | typeof SIGN_UP_REQUEST
  | typeof SIGN_UP_SUCCESS
  | typeof SIGN_UP_FAILURE
  | typeof LOGIN_REQUEST
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_FAILURE;

interface User {
  id: string;
  email: string;
}

interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  payload: { email: string; password: string };
}

interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
  payload: User; 
}

interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  payload: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: { email: string; password: string };
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export type AuthActions =
  | SignUpRequestAction
  | SignUpSuccessAction
  | SignUpFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;

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

const rootReducer = (state: State = initialState, action: AuthActions): State => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGN_UP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case SIGN_UP_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
