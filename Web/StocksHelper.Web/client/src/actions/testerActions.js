import * as actionTypes from '../constants/TesterActionTypes';
import testerServices from '../services/TesterServices';

export default {
  getTestData: () => async (dispatch) => {
    await testerServices
      .getTestData()
      .then(res => {
        dispatch({ type: actionTypes.TEST_DATA_FETCHED, testData: res , isLoading: false })
      });
  }
} 