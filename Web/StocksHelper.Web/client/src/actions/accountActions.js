import * as actionTypes from '../constants/AccountActionTypes';
import accountService from '../services/AccountService';

const login = (credientials) => async (dispatch) => {
  accountService
    .login(credientials)
    .then(data => dispatch({ type: actionTypes.USER_LOGGED_IN, data }))
    .catch(({ message }) => dispatch({ type: actionTypes.LOGIN_FAILED, message }));
}

const register = (credientials) => (dispatch) => {
  accountService
    .register(credientials)
    .then(() => {
      let { email, password } = credientials;
      // Login directly if request is successful
      login({ email, password })(dispatch);
    })
    .catch(({ message }) => dispatch({ type: actionTypes.REGISTER_FAILED, message }))
}

const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.USER_LOGGED_OUT })
}

export default {
  login,
  register,
  logout
}


