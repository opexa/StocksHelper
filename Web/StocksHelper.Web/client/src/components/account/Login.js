import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FILL_ALL_FIELDS } from '../../constants/AppConstants';
import notifications from '../../infrastructure/notifications';

import Form from '../shared/hocs/Form';
import '../../content/css/account.css';

export default class Login extends Component {
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validate(model) {
    if (this.validateEmail(model.email) && model.password) {
      return true;
    }
    return false;
  }

  handleSubmit = (data) => {
    if (this.validate(data)) {
      this.props.login(data);
    } else {
      notifications.alert(FILL_ALL_FIELDS);
    }
  }

  render() {
    if (this.props.isLoggedIn) 
      return <Redirect to='/' />
      
    return (
      <div className='col-sm-4 ml-auto mr-auto'>
        <h1 className='form-heading'>Login</h1>
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
            <div className='text-right'>
              <button type="submit" className="btn btn-outline-primary">Sign in</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
