import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import layout from '../reducers/layout';
import account from '../reducers/account';
import teams from '../reducers/teams';

export default function configureStore(history, initialState) {
  // Defining all reducers ( in Flux: stores)
  const reducers = {
    account,
    layout,
    teams
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
