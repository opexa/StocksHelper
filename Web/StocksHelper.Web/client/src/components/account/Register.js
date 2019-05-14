import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FILL_ALL_FIELDS, PASSWORDS_DONT_MATCH } from '../../constants/AppConstants';
import notifications from '../../infrastructure/notifications';

import Form from '../shared/hocs/Form';
import '../../content/css/account.css';

export default class Register extends Component {
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validate(model) {
    let modelState = { isValid: true }
    if (this.validateEmail(model.email) && model.password && model.passwordConfirmation) {
      if (model.password !== model.passwordConfirmation) {
        modelState.isValid = false;
        modelState.message = PASSWORDS_DONT_MATCH;
      }
    } else {
      modelState.isValid = false;
      modelState.message = FILL_ALL_FIELDS;
    }    

    return modelState;
  }

  handleSubmit = (data) => {
    let model = this.validate(data);
    if (model.isValid) {
      this.props.register(data);
    } else {
      notifications.alert(model.message)
    }
  }

  render() {
    if (this.props.isLoggedIn) 
      return <Redirect to='/' />
      
    return (
      <div className='col-sm-4 ml-auto mr-auto'>
        <h1 className='form-heading'>Register</h1>
        <div className='form-wrapper'>
          <Form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name='password' placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Password</label>
              <input type="password" className="form-control" name='passwordConfirmation' placeholder="Password" />
            </div>
            <div className='text-right'>
              <button type="submit" className="btn btn-outline-primary">Sign up</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
