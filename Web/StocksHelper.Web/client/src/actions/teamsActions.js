import * as actionTypes from '../constants/TeamsActionTypes';
import { APP_ERROR } from '../constants/LayoutActionTypes';
import { push } from 'react-router-redux';
import notifications from '../infrastructure/notifications';
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

const createTeam = (team) => (dispatch) => {
  teamsService
    .create(team)
    .then(newTeam => {
      dispatch({ type: actionTypes.TEAM_CREATED, newTeam });
      dispatch(push('/teams/my'));
    })
    .catch(({ message }) => {
      notifications.error(message);
      dispatch({ type: actionTypes.CREATE_TEAM_ERROR, message })
    });
}

const leaveTeam = (team) => (dispatch) => {
  teamsService
    .leave(team)
    .then(({ teamId }) => {
      dispatch({ type: actionTypes.TEAM_LEFT, teamId });
      notifications.success('Team left successfully.');
    })
    .catch(({ message }) => dispatch({ type: APP_ERROR, message }));
}

export default {
  fetchMyTeams,
  loadTeam,
  resetSelectedTeam,
  suggestMembers,
  clearMemberSuggestions,
  createTeam,
  leaveTeam
}
