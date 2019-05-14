import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class TeamsNavigation extends Component {
  componentDidMount = () => this.props.fetchMyTeams();

  render() {
    return (
      <div className="col-md-4 px-0 border border-primary">
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
            {this.props.myTeams.map((team) => (
              <NavLink to={`/teams/my/${team.id}`} className='nav-link team-link' activeClassName='active' key={team.id}>
                <div className='d-flex'>
                  {team.teamPhoto ? <img src={team.teamPhoto} alt="" className='team-photo' /> : <img src='http://gigapan.com/images/default-group-avatar.jpg?1380820092' alt='' className='team-photo' />}&nbsp;&nbsp;
                  <span>{team.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }
}