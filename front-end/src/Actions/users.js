import axios from 'axios';

export const userSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStarted());
    try {
      let response = await axios({
        method: 'post',
        url: 'http://localhost:5000/users/login',
        data: {
          email,
          password,
        },
      });

      if (response.status === 202) {
        console.log(response.data);
        dispatch({ type: 'LOGIN_SUCCESS', user: response.data });
        storeTokeninLocalStorage(response.data);
      }
      if (response.status === 401) {
        dispatch({ type: 'LOGIN_FAIL', error: response.data });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', error: err.response.data });
    }
  };
};

export const userSignUp = ({
  email,
  address,
  password,
  lastName,
  firstName,
}) => {
  return async (dispatch) => {
    dispatch(loginStarted());

    try {
      let response = await axios({
        method: 'post',
        url: 'http://localhost:5000/users/register',
        data: {
          email,
          password,
          firstName,
          lastName,
          address,
          reviews: [],
        },
      });

      if (response.status === 201) {
        console.log(response.data);
        dispatch({ type: 'LOGIN_SUCCESS', user: response.data });
        storeTokeninLocalStorage(response.data);
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', error: err.response.data });
    }
  };
};

export const loginStarted = () => {
  return { type: 'LOGIN_STARTED' };
};

// The two functions below are not action creators but I have stored in here for simplify as
// they are functions related to the user and authentication

export const isTokenValid = () => {
  // Here I want to check if
  let user = null;
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    // My jwt token has been set on the server to expire in one hour, therefore I want to check if there
    // is a jwt token in local storage and if over 1 hour old then delete it and the user
    // has to sign in again to create a new token
    let time = new Date();
    let currentTimeInSeconds = time.getTime();
    let seconds = Object.entries(userInfo).filter(
      (key) => key[0] === 'seconds'
    );

    if (parseInt(seconds[0][1]) + 3600000 < parseInt(currentTimeInSeconds)) {
      // This means it has been over an hour and I need to clear the JWT from local storage as it
      // has expired and other user info
      localStorage.removeItem('userInfo');
    } else {
      user = true;
    }
    return user;
  }
};

export const storeTokeninLocalStorage = (data) => {
  // the seconds stores stores the seconds elapsed since 19070 which i will
  // use in the tokenIsvalid function to check if the token is over an hour old and
  // if so delete it
  localStorage.setItem('userInfo', JSON.stringify(data));
};
