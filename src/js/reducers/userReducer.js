export default function userReducer(state = {
  user: {
    id: null,
    name: null,
    age: null,
  },
  fetching: false,
  fetched: false,
  error: null,
}, action) {


  switch (action.type) {
    case "FETCH_USER": {
      return {...state, fetching: true};
    }

    case "FETCH_USER_REJECTED": {
      return {...state, fetching: false, error: action.payload};
    }

    case "FETCH_USER_FULFILLED": {
      return {...state, fetching: false, fetched: true, user: action.payload};
    }

    // action : {type : "SET_USER_NAME", payload: user.name: String }
    case "SET_USER_NAME": {
      return {
        ...state,
        user: {...state.user, name: action.payload},
      };
    }

    // action : {type : "SET_USER_AGE", payload: user.age: Number }
    case "SET_USER_AGE": {
      return {
        ...state,
        user: {...state.user, age: action.payload},
      };
    }

    default:
      console.log('action.type does not match any ' +
        'condition in reducer');
  }

  return state;
}
