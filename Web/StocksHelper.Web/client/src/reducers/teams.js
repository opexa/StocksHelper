import * as actionTypes from '../constants/TeamsActionTypes';

const initialState = {
  myTeams: [],
  selectedTeam: {},
  memberSuggestions: []
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
    case actionTypes.SELECTED_TEAM_RESET: {
      return {
        ...state,
        selectedTeam: {},
        memberSuggestions: []
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
    default:
      return state;
  }
}