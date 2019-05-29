import * as actionTypes from '../constants/TeamsActionTypes';
import { TEAM_ALERT_ADDED, TEAM_ALERT_DELETED } from '../constants/AlertsActionTypes';

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
        myTeams: action.myTeams
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
    case TEAM_ALERT_ADDED: {
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          alerts: state.selectedTeam.alerts.length < 3 ? state.selectedTeam.alerts.concat([action.alert]) : state.selectedTeam.alerts
        }
      }
    }
    case TEAM_ALERT_DELETED: {
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          alerts: state.selectedTeam.alerts.filter(alert => alert.id !== action.alertId)
        }
      }
    }
    default:
      return state;
  }
}
