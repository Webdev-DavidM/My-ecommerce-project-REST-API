const initialState = {
  user: {
    firstName: null,
    lastName: null,
    id: null,
    token: '',
    isAdmin: null,
  },
  error: null,
  loading: false,
  signedIn: false,
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_STARTED':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user,
        loading: false,
        signedIn: true,
        error: null,
      };
    case 'LOGIN_FAIL':
      console.log(action);
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
}

export default usersReducer;
