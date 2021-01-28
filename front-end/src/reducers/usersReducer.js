const initialState = {
  user: { firstName: null, lastName: null, id: null, token: '' },
  error: null,
  loading: true,
};

function usersReducer(state = initialState, action) {
  console.log(action.user);
  switch (action.type) {
    case 'LOGIN_STARTED':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.user, loading: false };
    case 'LOGIN_FAIL':
      console.log(action);
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export default usersReducer;
