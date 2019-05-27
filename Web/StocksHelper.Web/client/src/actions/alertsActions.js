import * as actionTypes from '../constants/AlertsActionTypes';
import alertsService from '../services/AlertsService';
import notifications from '../infrastructure/notifications';

const addTeamAlert = (alert) => (dispatch) => {
  alertsService
    .addTeamAlert(alert)
    .then(data => notifications.success('Alert added.'))
    .catch(({message}) => notifications.error(message));
}

const deleteTeamAlert = (alertId) => (dispatch) => {
  alertsService
    .deleteTeamAlert(alertId)
    .then(() => {
      notifications.alert('Team alert was deleted successfully.');
      dispatch({ type: actionTypes.TEAM_ALERT_DELETED, alertId });
    })
    .catch(({ message }) => notifications.error(message));
}

export default {
  addTeamAlert,
  deleteTeamAlert
}