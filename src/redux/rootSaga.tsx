import { all } from 'redux-saga/effects';
import watchAuthSaga from '../auth/authSaga';
import watchProductSaga from '../products/productSaga';

export default function* rootSaga() {
  yield all([watchAuthSaga(),watchProductSaga()]);
}