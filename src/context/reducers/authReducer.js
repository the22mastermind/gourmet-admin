const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        auth: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
};

export default authReducer;
