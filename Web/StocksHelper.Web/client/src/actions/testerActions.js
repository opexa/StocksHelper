import * as actionTypes from '../constants/TesterActionTypes';
import testerService from '../services/TesterService';

export default {
  getTestData: () => async (dispatch) => {
    testerService
      .getTestData()
      .then(res => dispatch({ type: actionTypes.TEST_DATA_FETCHED, testData: res, isLoading: false }));
  }
} 