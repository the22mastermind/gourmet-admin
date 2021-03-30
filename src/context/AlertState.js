import React, { createContext, useReducer } from 'react';
import alertReducer from './reducers/alertReducer';

const initialState = {
  alert: null,
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const showAlert = (data) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: data,
    });
  };

  const clearAlert = async () => {
    dispatch({
      type: 'CLEAR_ALERT',
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
        clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
