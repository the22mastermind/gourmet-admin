import React, { createContext, useReducer } from 'react';
import dataReducer from './reducers/dataReducer';

const initialState = {
  ordersList: [],
};

export const DataContext = createContext(initialState);

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getAllOrders = async (data) => {
    dispatch({
      type: 'GET_ALL_ORDERS',
      payload: data,
    });
  };

  return (
    <DataContext.Provider
      value={{
        ordersList: state.ordersList,
        getAllOrders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
