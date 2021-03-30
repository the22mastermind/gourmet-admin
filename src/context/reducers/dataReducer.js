const dataReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_ORDERS':
      return {
        ...state,
        ordersList: action.payload,
      };
    default:
      throw new Error();
  }
};

export default dataReducer;
