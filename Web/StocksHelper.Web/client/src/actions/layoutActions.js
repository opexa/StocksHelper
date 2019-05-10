import * as actionTypes from '../constants/LayoutActionTypes';

export default {
  toggleNavbar: () => (dispatch) => dispatch({ type: actionTypes.NAVBAR_TOGGLED })
} 