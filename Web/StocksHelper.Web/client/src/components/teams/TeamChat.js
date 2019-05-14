import React, { Component } from 'react';

export default class TeamChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamId: props.match.params.id
    }
  }

  componentDidMount () {
    this.props.loadTeam(this.state.teamId);
  }
  
  componentWillReceiveProps (newProps) {
    let id = newProps.match.params.id;
    
    if (id !== undefined) {
      if (id !== this.state.teamId) {
        this.props.loadTeam(id);

        this.setState({ teamId: id });
      }
    }
  }

  render () {
    return (
      <div className="col-md-8">
        <div className='border border-primary'>
          <p>
            {this.props.team.name || 'No name'}
          </p>
        </div>
      </div>
    );
  }
}