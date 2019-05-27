import React, { Component, Fragment } from 'react';
import Prompt from '../shared/hocs/Prompt';

const TeamAlert = ({ id, ticker, price, isCreatedByIssuer, onDelete }) => (
  <div className="team-alert d-flex justify-content-between">
    <h6 className='alert-ticker'>
      {ticker}
      {isCreatedByIssuer ? <i className="fas fa-trash delete-alert-btn" onClick={() => onDelete(id)}></i> : ''}
    </h6>
    <span className='alert-price'>{price}</span>
  </div>
);

export default class TeamAlerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertDeletePrompt: false,
      alertDeleteId: null
    }
  }

  showAlertDeletePrompt = (alertId) => this.setState({ alertDeletePrompt: true, alertDeleteId: alertId });
  onAlertDeletePromptClose = () => this.setState({ alertDeletePrompt: false, alertDeleteId: null });

  onAlertDeleteSubmit = () => {
    this.props.deleteTeamAlert(this.state.alertDeleteId);
    this.onAlertDeletePromptClose();
  }

  render() {
    const alerts = this.props.alerts.length > 0 ? 
                   this.props.alerts.map(alert => <TeamAlert key={alert.id} {...alert} onDelete={this.showAlertDeletePrompt} />)
                   : <i>Your team has no alerts set.</i>;

    return (
      <Fragment>
        <div className="team-alerts">
          <div className='d-flex'>
            <h5>Team alerts</h5>
            <span className="btn btn-outline-success btn-sm add-alert-btn" onClick={this.props.openAddAlertForm}>+ ADD</span>
          </div>
          <div className="alerts-container">
            {alerts}
          </div>
        </div>
        {this.state.alertDeletePrompt ? <Prompt title='Confirm alert deletion.' message='Are you sure you want to delete this alert?' confirm={this.onAlertDeleteSubmit} cancel={this.onAlertDeletePromptClose}/> : ''}
      </Fragment>
    );
  }
}