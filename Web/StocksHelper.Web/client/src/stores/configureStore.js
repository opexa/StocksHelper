import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import tester from '../reducers/tester';
import layout from '../reducers/layout';
import account from '../reducers/account';

export default function configureStore(history, initialState) {
  // Defining all reducers ( in Flux: stores)
  const reducers = {
    account,
    tester,
    layout
  };

  // Combining all middelwares in a whole piece
  const middlewares = [
    thunk,
    routerMiddleware(history)
  ];

  // Combine the seperate reducers in a whole piece
  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
