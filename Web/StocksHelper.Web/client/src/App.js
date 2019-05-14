import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

import Layout from './containers/Layout';
import Tester from './containers/Tester';
import Login from './containers/account/Login';
import Logout from './containers/account/Logout';
import Register from './containers/account/Register';

import '@fortawesome/fontawesome-free/css/all.css';
import 'noty/lib/noty.css';
import 'noty/lib/themes/nest.css';
import './content/css/app.css';

export default () => (
  <Layout>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/tester' component={Tester} />

      <Route path='/account/login' component={Login} />
      <Route path='/account/register' component={Register} />
      <Route path='/account/logout' component={Logout} />
    </Switch>
  </Layout>
);
