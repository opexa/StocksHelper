import httpClient from '../infrastructure/httpClient';
import {
  FETCH_MY_TEAMS_URL,
  LOAD_MY_TEAM_URL
} from '../constants/AppConstants';

export default {
  fetchMyTeams: async () => {
    return await httpClient.get(FETCH_MY_TEAMS_URL, true);
  },
  loadTeam: async (teamId) => {
    return await httpClient.get(`${LOAD_MY_TEAM_URL}/${teamId}`, true);
  }
}