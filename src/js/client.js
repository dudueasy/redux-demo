// import React from "react";
// import ReactDOM from "react-dom";
// import Layout from "./components/Layout";
//
// const app = document.getElementById("root");
//
// ReactDOM.render(<Layout />, app);

import {combineReducers, createStore} from 'redux';

// receive state.user as it's state argument
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      state = {...state, name: action.payload};
      break;

    case "CHANGE_AGE":
      state = {...state, age: action.payload};
      break;
  }

  return state;
};

// receive state.tweet as it's state argument
const tweetReducer = (state = [], action) => {
  return state;
};


const reducers = combineReducers({
  user: userReducer,
  tweet: tweetReducer,
});


const store = createStore(reducers);

store.subscribe(() => {
  console.log("store changed to be: ", store.getState());
});

store.dispatch({type: "CHANGE_NAME", payload: "Will"});
store.dispatch({type: "CHANGE_AGE", payload: "20"});
store.dispatch({type: "CHANGE_AGE", payload: "21"});
