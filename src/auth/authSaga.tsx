import { call, put, takeLatest } from 'redux-saga/effects';
import { FirebaseAuthTypes,firebase } from '@react-native-firebase/auth';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../redux/actions';


export const signUpWithEmailPasswordFirebase = async (
    email: string,
    password: string,
  ) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user + 'signed Up')
    } )
      .catch(err => {
        throw new Error(err);
      });
  };

  export const signInWithEmailPasswordFirebase = async (
    email: string,
    password: string,
  ) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
      })
      .catch(err => {
        throw new Error(err);
      });
  };



function* signUpSaga(action: { type: string; payload: { email: any; password: any } }) {
  const { email, password } = action.payload;  
  try {
    const { user } = yield call(signUpWithEmailPasswordFirebase, email, password);
    
    yield put({ type: SIGN_UP_SUCCESS, payload: user });
   
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, payload: (error as FirebaseAuthTypes.NativeFirebaseAuthError).message });
  }
}

function* loginSaga(action: { type: string; payload: { email: any; password: any } }) {
  const { email, password } = action.payload;
  try {
    const { user } = yield call(signInWithEmailPasswordFirebase, email, password);
    yield put({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: (error as FirebaseAuthTypes.NativeFirebaseAuthError).message });
  }
}

export default function* watchSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}


