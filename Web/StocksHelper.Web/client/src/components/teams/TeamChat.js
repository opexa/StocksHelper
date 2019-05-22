import React, { Component } from 'react';
import * as DEFAULT_TEAM_PHOTO from '../../content/images/default-team-photo.jpg';
import AddAlertForm from './AddAlertForm';

export default class TeamChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddAlertForm: false
    }
  }

  handleFormSubmit = (alert) => {
    alert.teamId = this.props.team.id;

    this.props.addTeamAlert(alert);
  }

  componentDidMount = () => this.props.loadTeam();

  openAddAlertForm = () => this.setState({ showAddAlertForm: true });
  closeAddAlertForm = () => this.setState({ showAddAlertForm: false });

  render() {
    if (!this.props.team.name) {
      return (
        <div className="col-md-8 float-left">
          <div className='border border-primary team-selected'></div>
          <i>No team is selected.</i>
        </div>
      );
    }

    return (
      <div className="col-md-8 float-left">
        <div className='border border-primary team-selected'>
          <div className="team-header">
            <div className="d-flex align-items-center">
              <img className='team-photo' src={this.props.team.teamPhoto || DEFAULT_TEAM_PHOTO} alt='' />
              <h3>{this.props.team.name}</h3>
            </div>
          </div>
          <hr />
          <div className="team-alerts">
            <div className='d-flex'>
              <h5>Team alerts</h5>
              <span className="btn btn-outline-success btn-sm add-alert-btn" onClick={this.openAddAlertForm}>+ ADD</span>
            </div>
          </div>
        </div>
        {this.state.showAddAlertForm ? <AddAlertForm onClose={this.closeAddAlertForm} onSubmit={this.handleFormSubmit} /> : ''}
      </div>
    );
  }
}