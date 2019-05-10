import * as actionTypes from '../constants/AccountActionTypes';
import notifications from '../infrastructure/notifications';
import authService from '../services/AuthService';

const initialState = {
  isLoggedIn: authService.isAuthorized()
}

export default function tester(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_FAILED: {
      notifications.error(action.message);
      return state;
    }
    case actionTypes.USER_LOGGED_IN: {
      let { access_token, expires_in } = action.data;
      authService.authorize(access_token, expires_in);

      notifications.success('Logged in successfully.');
      
      return {
        ...state, 
        isLoggedIn: true
      };
    }
    case actionTypes.USER_LOGGED_OUT: {
      authService.unauthorize();

      return {
        ...state,
        isLoggedIn: false
      }
    }
    case actionTypes.REGISTER_FAILED: {
      notifications.error(action.message);
      return state;
    }
    default:
      return state;
  }
}