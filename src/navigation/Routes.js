import React, { useContext, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import { AuthContext } from '../context/AuthState';

import LoginPage from '../pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound/NotFound';

const Routes = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
  }, [auth]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute path="/dashboard" auth={auth} component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
