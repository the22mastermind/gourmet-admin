import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Route exact path="/">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/dashboard" auth={auth} component={Dashboard} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
