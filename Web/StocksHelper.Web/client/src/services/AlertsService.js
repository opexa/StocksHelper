import httpClient from '../infrastructure/httpClient';
import { ADD_TEAM_ALERT_URL, DELETE_TEAM_ALERT_URL } from '../constants/AppConstants';

export default {
  addTeamAlert: async (alert) => {
    return await httpClient.post(ADD_TEAM_ALERT_URL, true, alert);
  },
  deleteTeamAlert: async (alertId) => {
    return await httpClient.remove(`${DELETE_TEAM_ALERT_URL}${alertId}`, true);
  }
}