import React from 'react';
import { Route } from 'react-router-dom';

import TeamChat from './TeamChat';
import TeamsNavigation from './TeamsNavigation';

import '../../content/css/teams.css';

export default (props) => (
  <div className="row">    
    <TeamsNavigation fetchMyTeams={props.fetchMyTeams} myTeams={props.myTeams} />     
    <Route path={`${props.match.url}/my/:id?`} render={(routeProps) => <TeamChat team={props.selectedTeam} loadTeam={props.loadTeam} {...routeProps} />} />
  </div>
);