import { call, put, takeLatest } from 'redux-saga/effects';
import { firestore } from '@react-native-firebase/firestore'; 
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
} from '../actions/productActions';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../../index';

function* addProductToFirestore(product) {
    const { name, price, description, image } = product;
    try {
      const docRef = yield addDoc(collection(db, "products"), {
        name: name,
        price: price,
        description: description,
        imageUrl: image
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

function* editProductInFirestore(productId, productData) {
  try {
    yield call(firestore().collection('products').doc(productId).update, productData);
    const updatedProduct = yield call(firestore().collection('products').doc(productId).get);
    return { id: updatedProduct.id, ...updatedProduct.data() };
  } catch (error) {
    throw new Error(error.message);
  }
}

function* deleteProductFromFirestore(productId) {
  try {
    yield call(firestore().collection('products').doc(productId).delete);
  } catch (error) {
    throw new Error(error.message);
  }
}

function* addProductSaga(action) {
  try {
    const product = yield call(addProductToFirestore, action.payload);
    yield put({ type: ADD_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    yield put({ type: ADD_PRODUCT_FAILURE, payload: error.message });
  }
}

function* editProductSaga(action) {
  try {
    const product = yield call(editProductInFirestore, action.payload.productId, action.payload.productData);
    yield put({ type: EDIT_PRODUCT_SUCCESS, payload: product });
  } catch (error) {
    yield put({ type: EDIT_PRODUCT_FAILURE, payload: error.message });
  }
}

function* deleteProductSaga(action) {
  try {
    yield call(deleteProductFromFirestore, action.payload);
    yield put({ type: DELETE_PRODUCT_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
}

function* fetchProductsSaga() {
  try {
    const productsSnapshot = yield call(firestore().collection('products').get);
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

export default function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
  yield takeLatest(EDIT_PRODUCT_REQUEST, editProductSaga);
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
}
