const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        alert: action.payload,
      };
    case 'CLEAR_ALERT':
      return {
        ...state,
        alert: null,
      };
    default:
      throw new Error();
  }
};

export default alertReducer;
