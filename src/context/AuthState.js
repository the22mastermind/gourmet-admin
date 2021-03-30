import React, { createContext, useReducer } from 'react';
import authReducer from './reducers/authReducer';
import history from '../utils/history';

const initialState = {
  auth: JSON.parse(sessionStorage.getItem('auth')),
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function loginUser(token, data, from) {
    sessionStorage.setItem('auth', JSON.stringify(data));
    sessionStorage.setItem('token', JSON.stringify(token));
    dispatch({
      type: 'AUTH_LOGIN',
      payload: data,
    });
    history.push(from);
  }

  function logoutUser() {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider value={{
      auth: state.auth,
      loginUser,
      logoutUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
