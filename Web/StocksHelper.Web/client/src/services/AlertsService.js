import httpClient from '../infrastructure/httpClient';
import { ADD_TEAM_ALERT_URL } from '../constants/AppConstants';

export default {
  addTeamAlert: async (alert) => {
    return await httpClient.post(ADD_TEAM_ALERT_URL, true, alert);
  }
}