import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import * as DEFAULT_TEAM_PHOTO from '../../content/images/default-team-photo.jpg';

export default class TeamsNavigation extends Component {
  componentDidMount = () => this.props.fetchMyTeams();

  render() {
    return (
      <div className="col-md-4 px-0 border border-primary float-left">
        <div className="teams-navigation">
          <div className="teams-navigation-header">
            <h4>My Teams</h4>
            <hr />
          </div>
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <NavLink to='/teams/create' className='nav-link' activeClassName='active'>
              <div className='d-flex'>
                <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;<span>Create new team</span>
              </div>
            </NavLink>
            {this.props.myTeams.map((team) => {
              let activeClassName = team.id === this.props.selectedTeamId ? 'active' : '';
              return (
                <Link to={`/teams/my`} className={`nav-link team-link ${activeClassName}`} onClick={() => this.props.loadTeam(team.id)} key={team.id}>
                  <div className='d-flex'>
                    <img src={team.teamPhoto || DEFAULT_TEAM_PHOTO} alt="" className='team-photo' />&nbsp;&nbsp;
                    <span>{team.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}