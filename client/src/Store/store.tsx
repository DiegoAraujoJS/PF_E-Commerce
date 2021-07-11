import { createStore, applyMiddleware,/*  compose */ } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from '../Reducer/reducer';

// const composeEnhancers = compose;

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )