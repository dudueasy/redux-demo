import {applyMiddleware, createStore} from 'redux';


const reducer = (state, action) => {
  if (action.type === "E") {
    throw Error('AHHHHh');
  }
  return state;
};

// define a middleware function

// a middleware function receive store
// and return a function with next middleware's dispatch function as argument
// and then return return a function of action
// signature of a middleware function ({ getState, dispatch }) => next => action.


const logger = (store) => (next) => (action) => {
  console.log('action fired', action);
  next(action);
};

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log("AHHHHH! ", e);
  }
};

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 1, middleware);

let next = store.dispatch;


store.subscribe(() => {
  console.log("store changed to be: ", store.getState());
});

store.dispatch({type: "CHANGE_NAME", payload: "Will"});
store.dispatch({type: "E", payload: "20"});
store.dispatch({type: "CHANGE_AGE", payload: "21"});
