import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import usersReducer from './reducers/usersReducer';
import productsReducer from './reducers/productsReducer';
import ordersReducer from './reducers/ordersReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

let rootReducer = combineReducers({
  usersReducer,
  productsReducer,
  ordersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
