import * as actionTypes from '../constants/TesterActionTypes';

const initialState = {
  testData: [],
  isLoading: true
}

export default function tester(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TEST_DATA_FETCHED: {
      return {
        ...state,
        isLoading: false,
        testData: action.testData
      };
    }
    default:
      return state;
  }
}