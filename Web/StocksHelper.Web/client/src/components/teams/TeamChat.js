import React, { Component } from 'react';
import { DEFAULT_GROUP_PHOTO } from '../../constants/AppConstants';

export default class TeamChat extends Component {
  componentDidMount = () => this.props.loadTeam();

  render () {
    return (
      <div className="col-md-8 float-left">
        <div className='border border-primary team-selected'>
          <div className="team-header">
            <div className="d-flex align-items-center">
              <img className='team-photo' src={this.props.team.teamPhoto || DEFAULT_GROUP_PHOTO} alt=''/>
              <h3>{this.props.team.name}</h3>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}