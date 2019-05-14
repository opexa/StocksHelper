import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default ({ isAuthorized }) => {
  if (isAuthorized) {
    return (
      <Fragment>
        <li className="nav-item">
          <NavLink tag={Link} className="text-dark" to='/account'>
            <i className="far fa-user"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink tag={Link} className='text-dark' to='/account/logout'>
            <i className="fas fa-sign-out-alt"></i>
          </NavLink>
        </li>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <li className="nav-item">
        <NavLink tag={Link} className='text-dark' to='/account/login'>Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink tag={Link} className='text-dark' to='/account/register'>Register</NavLink>
      </li>
    </Fragment>
  );
}