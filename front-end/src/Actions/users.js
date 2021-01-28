import axios from 'axios';

export const userSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStarted());
    try {
      let response = await axios({
        method: 'post',
        url: '/users/login',
        data: {
          email,
          password,
        },
      });

      if (response.status === 202) {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', action: err.response.data });
    }
  };
};

export const loginStarted = () => {
  return { type: 'LOGIN_STARTED' };
};
