import { call, put, takeLatest } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from '../redux/actions';

export const addProductToFireStore = async (
    data:any

  ) => {
    console.log("step 1",data);
    return firestore()
      .collection('products')
      .add(data)
      .then(user => {
        console.log("Product created");
    } )
      .catch(err => {
        throw new Error(err);
      });
  };


function* addProductSaga(action: { type: string; payload: any }): Generator<any, void, any> {
    
  const { product } = action.payload;
  let date = new Date();
  const timestamp = date.getTime();
  const data = {
    name:product.name,
    price:product.price,
    createdAt:timestamp

  }
  console.log("data..",data);
  try {
    const docRef = yield call(addProductToFireStore, data);
    console.log("product data",docRef);
    const newProduct = { ...data, id: docRef.id };
    
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: newProduct });
  } catch (error:any) {
    yield put({ type: ADD_PRODUCT_FAILURE, payload: error.message });
  }
}

function* editProductSaga(action: { type: string; payload: { productId: string; updatedProduct: any } }): Generator<any, void, any> {
    const { productId, updatedProduct } = action.payload;
    try {
      const productRef = yield call(firestore().collection('products').doc, productId);
      yield call(productRef.update, updatedProduct);
      yield put({ type: EDIT_PRODUCT_SUCCESS, payload: updatedProduct });
    } catch (error:any) {
      yield put({ type: EDIT_PRODUCT_FAILURE, payload: error.message });
    }
  }

function* deleteProductSaga(action: { type: string; payload: { productId: any } }): Generator<any, void, any> {
  const { productId } = action.payload;
  try {
    yield call(firestore().collection('products').doc(productId).delete);
    yield put({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error:any) {
    yield put({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
}

function* fetchProductsSaga(): Generator<any, void, any> {
  try {
    const productsSnapshot = yield call(firestore().collection('products').get);
    const products: any[] = [];
    productsSnapshot.forEach((doc: { id: any; data: () => any; }) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error:any) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

export default function* watchProductSaga() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
  yield takeLatest(EDIT_PRODUCT_REQUEST, editProductSaga);
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}