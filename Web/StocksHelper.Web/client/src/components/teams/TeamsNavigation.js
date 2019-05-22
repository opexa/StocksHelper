import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom'
import * as DEFAULT_TEAM_PHOTO from '../../content/images/default-team-photo.jpg';
import Prompt from '../shared/hocs/Prompt';

export default class TeamsNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaveTeamPrompt: false,
      promptTeamId: null
    }
  }

  openOptions = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  }

  openLeaveTeamPrompt = (promptTeamId) => this.setState({ leaveTeamPrompt: true, promptTeamId });
  closeLeaveTeamPrompt = () => this.setState({ leaveTeamPrompt: false, promptTeamId: null });
  confirmLeaveTeamPrompt = () => {
    this.props.leaveTeam({ id: this.state.promptTeamId });
    this.closeLeaveTeamPrompt();
  }

  render() {
    return (
      <Fragment>
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
              {this.props.myTeams.map((team, i) => {
                let activeClassName = this.props.isCreateTeamOpened ? '' : (team.id === this.props.selectedTeamId ? 'active' : '');

                return (
                  <Link to={`/teams/my`} className={`nav-link team-link ${activeClassName}`} onClick={() => this.props.loadTeam(team.id)} key={team.id}>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex'>
                        <img src={team.teamPhoto || DEFAULT_TEAM_PHOTO} alt="" className='team-photo' />&nbsp;&nbsp;
                      <span>{team.name}</span>
                      </div>
                      <div className='dropdown'>
                        <i className="fas fa-ellipsis-h team-options dropdown-toggle" id={`team-options-btn-${i}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.openOptions} ></i>
                        <ul className="dropdown-menu" aria-labelledby={`team-options-btn-${i}`}>
                          <li className="dropdown-item" onClick={() => this.openLeaveTeamPrompt(team.id)}>Leave</li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {this.state.leaveTeamPrompt ? <Prompt title='Leave team' message='Are you sure you want to leave this team?' cancel={this.closeLeaveTeamPrompt} confirm={this.confirmLeaveTeamPrompt} /> : ''}
      </Fragment>
    );
  }
}