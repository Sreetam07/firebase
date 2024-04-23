import { call, put, takeLatest } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/auth';
import { SIGN_UP_REQUEST, LOGIN_REQUEST, LOGOUT_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT_SUCCESS } from '../actions/authActions';
import { navigate } from 'react-navigation-helpers';


export const signUpWithEmailPasswordFirebase = async (email, password) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return JSON.stringify(userCredential.user); 
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const signInWithEmailPasswordFirebase = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return JSON.stringify(userCredential.user); 
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export const signOutFirebase = async () => {
    try {
      const userCredential = await firebase.auth().signOut();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

function* signUpSaga(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield call(signUpWithEmailPasswordFirebase, email, password);
    yield put({ type: SIGN_UP_SUCCESS, payload: user });
    yield call(navigate, 'ProductList');
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, payload: error.message });
  }
}

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield call(signInWithEmailPasswordFirebase, email, password);
    yield put({ type: LOGIN_SUCCESS, payload: user });
    yield call(navigate, 'ProductList');
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

function* logoutSaga() {
  try {
    yield call(signOutFirebase);

    yield put({ type: LOGOUT_SUCCESS });
    // yield call(navigate, 'LogIn');
  } catch (error) {
    console.log('Logout Error:', error);
  }
}

export default function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}
