import React from 'react';
import { Route } from 'react-router-dom';

import TeamChat from './TeamChat';
import TeamsNavigation from './TeamsNavigation';

import '../../content/css/teams.css';
import CreateTeam from './CreateTeam';

export default (props) => (
  <div className="row d-block">
    <TeamsNavigation fetchMyTeams={props.fetchMyTeams}
                      myTeams={props.myTeams}
                      loadTeam={props.loadTeam}
                      selectedTeamId={props.selectedTeam.id} />
    <Route path={`${props.match.url}/my`} 
            render={(routeProps) => <TeamChat team={props.selectedTeam} 
                                              loadTeam={props.loadTeam} 
                                              {...routeProps} />} />
    <Route path={`${props.match.url}/create`}
            render={() => <CreateTeam resetNavigation={props.resetSelectedTeam} 
                                      suggestMembers={props.suggestMembers} 
                                      memberSuggestions={props.memberSuggestions}
                                      clearSuggestions={props.clearMemberSuggestions}
                                      createTeam={props.createTeam} /> } />
  </div>
);