import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import tester from '../reducers/tester';

export default function configureStore(history, initialState) {
  // Defining all reducers ( in Flux: stores)
  const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    tester: tester
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
