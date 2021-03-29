const dataReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_ORDERS':
      return {
        ...state,
        ordersList: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
