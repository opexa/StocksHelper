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
  if (teamId === undefined) {
    return dispatch({ type: actionTypes.LOAD_FIRST_TEAM });
  }

  teamsService
    .loadTeam(teamId)
    .then(team => dispatch({ type: actionTypes.TEAM_FETCHED, team }))
    .catch(({ message }) => dispatch({ type: APP_ERROR, message }))
}

const resetSelectedTeam = () => (dispatch) => {
  dispatch({ type: actionTypes.SELECTED_TEAM_RESET });
}

const suggestMembers = (input) => (dispatch) => {
  teamsService
    .suggestMembers(input)
    .then(suggestions => dispatch({ type: actionTypes.MEMBER_INPUT_SUGGESTIONS_FETCHED, suggestions }))
    .catch(({ message }) => dispatch({ type: APP_ERROR, message }));
}

const clearMemberSuggestions = () => (dispatch) => dispatch({ type: actionTypes.CLEAR_MEMBER_SUGGESTIONS });

export default {
  fetchMyTeams,
  loadTeam,
  resetSelectedTeam,
  suggestMembers,
  clearMemberSuggestions
}
