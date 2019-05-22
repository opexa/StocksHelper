import * as actionTypes from '../constants/TeamsActionTypes';
import {
  TEAM_ALERT_ADDED,
  ADD_TEAM_ALERT_FAIL
} from '../constants/AlertsActionTypes';

const initialState = {
  myTeams: [],
  selectedTeam: {},
  memberSuggestions: [],
  isCreateTeamOpened: false
}

export default function teams(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MY_TEAMS_FETCHED: {
      return {
        ...state,
        myTeams: action.myTeams,
        selectedTeam: action.myTeams[0] || {}
      };
    }
    case actionTypes.TEAM_FETCHED: {
      return {
        ...state,
        selectedTeam: action.team
      }
    }
    case actionTypes.LOAD_FIRST_TEAM: {
      return {
        ...state,
        selectedTeam: state.myTeams[0] || {}
      }
    }
    case actionTypes.MEMBER_INPUT_SUGGESTIONS_FETCHED: {
      return {
        ...state,
        memberSuggestions: action.suggestions
      }
    }
    case actionTypes.CLEAR_MEMBER_SUGGESTIONS: {
      return {
        ...state,
        memberSuggestions: []
      }
    }
    case actionTypes.TEAM_CREATED: {
      return {
        ...state,
        myTeams: state.myTeams.concat(action.newTeam),
        selectedTeam: action.newTeam
      }
    }
    case actionTypes.CREATE_TEAM_ERROR: {
      return state;
    }
    case actionTypes.TEAM_LEFT: {
      const newState = {
        ...state,
        myTeams: state.myTeams.filter(team => team.id !== action.teamId)
      }
      newState.selectedTeam = newState.myTeams[0] || {};

      return newState;
    }
    case actionTypes.CREATE_TEAM_OPENED: {
      return {
        ...state,
        selectedTeam: {},
        memberSuggestions: [],
        isCreateTeamOpened: true 
      }
    }
    case actionTypes.CREATE_TEAM_CLOSED: {
      return {
        ...state,
        isCreateTeamOpened: false
      }
    }
    
    default:
      return state;
  }
}
