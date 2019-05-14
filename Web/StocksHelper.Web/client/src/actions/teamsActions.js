import * as actionTypes from '../constants/TeamsActionTypes';
import { APP_ERROR } from '../constants/LayoutActionTypes';
import teamsService from '../services/TeamsService';

const fetchMyTeams = () => (dispatch) => {
  teamsService
    .fetchMyTeams()
    .then(myTeams => dispatch({ type: actionTypes.MY_TEAMS_FETCHED, myTeams }))
    .catch(({ message }) => dispatch({ type: APP_ERROR, message }));
}

const loadTeam = (teamId) => (dispatch) => {
  teamsService
    .loadTeam(teamId)
    .then(team => dispatch({ type: actionTypes.TEAM_FETCHED, team }))
    .catch(({ message }) => dispatch({ type: APP_ERROR, message }))
}

export default {
  fetchMyTeams,
  loadTeam
}
