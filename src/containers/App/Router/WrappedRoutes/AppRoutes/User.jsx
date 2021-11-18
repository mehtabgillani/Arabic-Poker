import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserPage from '../../../../../pages/users';
export default () => (
  <Switch>
    <Route path="/user" component={UserPage} />
  </Switch>
);
