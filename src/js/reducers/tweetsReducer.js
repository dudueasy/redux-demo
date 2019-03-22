export default function tweetsReducer(state = {
  tweets: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_TWEETS": {
      return {...state, fetching: true};
    }

    case "FETCH_TWEETS_REJECTED": {
      return {...state, fetching: false, error: action.payload};
    }

    case "FETCH_TWEETS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tweets: action.payload,
      };
    }

    // action :{type: "ADD_TWEET", payload: tweet:{id, text} }
    case "ADD_TWEET": {
      return {
        ...state,
        tweets: [...state.tweets, action.payload],
      };
    }

    // action : {type:"UPDATE_TWEET",  payload: tweet:{id, text}}
    case "UPDATE_TWEET": {
      const {id, text} = action.payload;
      const newTweets = [...state.tweets];
      const indexOfTweetToUpdate = newTweets.findIndex(tweet => tweet.id === id);
      newTweets[indexOfTweetToUpdate] = action.payload;

      return {
        ...state,
        tweets: newTweets,
      };
    }


    // action : {type:"DELETE_TWEET", payload: id:Number }
    case "DELETE_TWEET": {
      return {
        ...state,
        tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
      };
    }


    default:
      console.log('action.type does not match any ' +
        'condition in reducer');
  }

  return state;
}