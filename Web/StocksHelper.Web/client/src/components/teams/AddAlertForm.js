import React, { Component } from 'react';
import Prompt from '../shared/hocs/Prompt';
import Form from '../shared/hocs/Form';
import notifications from '../../infrastructure/notifications';

export default class AddAlertForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: ''
    }
  }

  handleFormSubimt = (data) => {
    data.moveType = data.moveType || 0;

    if (this.validateAlert(data)) {
      this.props.onSubmit(data);
      this.props.onClose();
    }
  }

  handleFormKeyPress = (ev) => {
    if (ev.which === 13) {
      ev.preventDefault();
    }
  }

  validateAlert = (alert) => {
    if (alert.ticker.length === 0 || alert.price.length === 0) {
      notifications.alert('Please fill all fields.');
      return false;
    }

    if (alert.price < 0) {
      notifications.alert('Price should be greater than 0.');
      return false;
    }

    return true;
  }

  render() {
    return (
      <Prompt cancel={this.props.onClose} className='add-alert-form' enableClose >
        <div className='d-flex justify-content-between'>
          <h5>New team alert</h5>
        </div>
        <hr />
        <div>
          <Form onSubmit={this.handleFormSubimt} onKeyPress={this.handleFormKeyPress}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder='Ticker' name='ticker' value={this.state.ticker} maxLength='5' onKeyUp={this.updateTickerValue} />
            </div>
            <div className="form-group d-flex justify-content-between">
              <input type="number" className="form-control" min='0.00' step='0.01' name='price' placeholder='Price' />
              <select name="moveType" className='form-control'>
                <option value="0">Above price</option>
                <option value="1">Below price</option>
              </select>
            </div>
            <div className="form-group">
              <textarea name="notes" className='form-control' placeholder='Notes (optional)' cols="30" rows="4"></textarea>
            </div>
            <div className="form-group">
              <button type='submit' className='btn btn-block btn-outline-primary'>+ Add</button>
            </div>
          </Form>
        </div>
      </Prompt>
    );
  }
}