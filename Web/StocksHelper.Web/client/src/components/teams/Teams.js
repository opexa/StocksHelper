import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import TeamChat from './TeamChat';
import TeamsNavigation from './TeamsNavigation';

import '../../content/css/teams.css';
import CreateTeam from './CreateTeam';

export default class Teams extends Component {
  componentDidMount = () => this.props.fetchMyTeams();

  render() {
    return (
      <div className="row d-block">
        <TeamsNavigation myTeams={this.props.myTeams}
                          loadTeam={this.props.loadTeam}
                          selectedTeamId={this.props.selectedTeam.id}
                          leaveTeam={this.props.leaveTeam}
                          isCreateTeamOpened={this.props.isCreateTeamOpened} />
        <Route path={`${this.props.match.url}/my`}
                render={() => <TeamChat team={this.props.selectedTeam}
                                        loadTeam={this.props.loadTeam}
                                        addTeamAlert={this.props.addTeamAlert}
                                        deleteTeamAlert={this.props.deleteTeamAlert} />} />
        <Route path={`${this.props.match.url}/create`}
                render={() => <CreateTeam createTeamOpened={this.props.createTeamOpened}
                                          createTeamClosed={this.props.createTeamClosed}
                                          suggestMembers={this.props.suggestMembers}
                                          memberSuggestions={this.props.memberSuggestions}
                                          clearSuggestions={this.props.clearMemberSuggestions}
                                          createTeam={this.props.createTeam} />} />
      </div>
    );
  }
}

