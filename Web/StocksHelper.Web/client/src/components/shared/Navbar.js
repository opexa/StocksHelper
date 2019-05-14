import React from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../content/images/logo.png';

import Authorization from './Authorization';

const Navbar = ({ toggle, isOpened, isAuthorized }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm fixed-top border-bottom box-shadow mb-3 navbar-light bg-light">
        <div className="container">
          <Link to='/' className='navbar-brand'>
            <img src={logo} alt="" />
          </Link>
          <button className="mr-2 navbar-toggler" type='button' onClick={toggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={` navbar-collapse ${isOpened ? '' : 'collapse'}`}>
            <ul className="navbar-nav flex-grow mr-auto">
              <li className="nav-item dropdown">
                <NavLink tag={Link} className='text-dark dropdown-toggle' id='team-dropdown' to='' role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Teams </NavLink>
                <div className="dropdown-menu" aria-labelledby='team-dropdown'>
                  <NavLink className="dropdown-item" tag={Link} to='/teams/create'>Create</NavLink>
                  <NavLink className="dropdown-item" tag={Link} to='/teams/my'>My teams</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink tag={Link} className='text-dark' to='/tester'>Tester</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav my-2 my-lg-0">
              <Authorization isAuthorized={isAuthorized} />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar