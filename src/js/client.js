import {applyMiddleware, createStore} from 'redux';
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_START":
      state = {...state, fetching: true};
      break;
    case "RECEIVE_USERS":
      state = {...state, fetching: false, fetched: true, users: action.payload};
      break;

    case "FETCH_USERS_ERROR":
      state = {...state, fetching: false, error: action.payload};
      break;
  }

  return state;
};


const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, initialState, middleware);



// 派发一个 thunk action creator (function)
store.dispatch((dispatch, getState) => {
  dispatch({type: "FETCH_USERS_START"});

  console.log(`currentState:`, getState());

  // do something async
  axios.get('http://rest.learncode.academy/api/wstern/users')
    .then(response =>

      dispatch({type: "RECEIVE_USERS", payload: [{name: 'Apolo'}]}),
    ).catch(e =>

    dispatch({type: "FETCH_USERS_ERROR", payload: e}),
  );

});

