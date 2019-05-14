import * as actionTypes from '../constants/TeamsActionTypes';

const initialState = {
  myTeams: [],
  selectedTeam: {}
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
    default:
      return state;
  }
}