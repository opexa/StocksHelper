import React, { Component } from 'react';
import * as DEFAULT_TEAM_PHOTO from '../../content/images/default-team-photo.jpg';

export default class TeamChat extends Component {
  componentDidMount = () => this.props.loadTeam();

  render() {
    return (
      <div className="col-md-8 float-left">
        <div className='border border-primary team-selected'>
          {
            !this.props.team.name ?
              <i>No team is selected.</i> :
              <div className="team-header">
                <div className="d-flex align-items-center">
                  <img className='team-photo' src={this.props.team.teamPhoto || DEFAULT_TEAM_PHOTO} alt='' />
                  <h3>{this.props.team.name}</h3>
                </div>
                <hr />
              </div>
          }
        </div>
      </div>
    );
  }
}