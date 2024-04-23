import { all } from 'redux-saga/effects';
import watchSaga from '../auth/authSaga';

export default function* rootSaga() {
  yield all([watchSaga()]);
}