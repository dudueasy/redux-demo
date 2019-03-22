import {applyMiddleware, createStore} from 'redux';
import axios from "axios";
import logger from "redux-logger";
import promise from "redux-promise-middleware";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING":
      state = {...state, fetching: true};
      break;
    case "RECEIVE_USERS_FULFILLED":
      state = {...state, fetching: false, fetched: true, users: action.payload};
      break;

    case "FETCH_USERS_REJECTED":
      state = {...state, fetching: false, error: action.error};
      break;
  }

  return state;
};


const middleware = applyMiddleware(promise, logger);
const store = createStore(reducer, initialState, middleware);


// 派发一个 thunk action creator (function)
store.dispatch(
  {
    type: "FETCH_USERS",
    payload: axios.get('http://rest.learncode.academy/api/wstern/users'),

  });

