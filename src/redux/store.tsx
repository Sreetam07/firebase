import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
 
import rootReducer from './reducers';
import rootSaga from './rootSaga';
 
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
 
const store = createStore(rootReducer, applyMiddleware(...middlewares));
 
sagaMiddleware.run(rootSaga);
 
export {store};