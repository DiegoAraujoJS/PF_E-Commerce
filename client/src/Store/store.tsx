
import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../Reducer/reducer'

declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]
  const composedEnhancers : any = compose(...enhancers)

export const store = createStore(
    reducer,  
    composedEnhancers)


// import { createStore, applyMiddleware,/*  compose */ } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from "redux-thunk";
// import rootReducer from '../Reducer/reducer';

// // const composeEnhancers = compose;

// export const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
//   )