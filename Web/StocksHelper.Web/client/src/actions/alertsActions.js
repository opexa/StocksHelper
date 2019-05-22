import * as actionTypes from '../constants/AlertsActionTypes';
import alertsService from '../services/AlertsService';
import notifications from '../infrastructure/notifications';

const addTeamAlert = (alert) => (dispatch) => {
  alertsService
    .addTeamAlert(alert)
    .then(data => notifications.success('Alert added.'))
    .catch(({message}) => notifications.error(message));
}

export default {
  addTeamAlert
}