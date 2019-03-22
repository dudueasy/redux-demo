import React, {Fragment} from "react";
import {connect} from "react-redux";
import {fetchUser} from "../actions/userActions";
import {fetchTweets} from "../actions/tweetsActions";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {user, tweets} = this.props;
    console.log("this.props: ", this.props);
    console.log("user: ", this.props.user);

    return (
      <Fragment>
        <button onClick={this.props.fetchTweets}>load tweets</button>
        {this.props.tweets.length ?
          this.props.tweets.map(tweet => <p key={tweet.id}>{tweet.text}</p>)
          :
          null
        }

        <button onClick={this.props.fetchUser}>load users</button>
        {this.props.user.name ?
          <h1>username: {this.props.user.name}</h1>
          :
          null
        }
      </Fragment>
    );
  }
}

const stateToProps = (state) => ({
  user: state.user.user,
  userFetched: state.user.fetched,
  tweets: state.tweets.tweets,
});

const dispatchToProps = (dispatch) => ({
  fetchTweets: () => {
    dispatch(fetchTweets());
  },
  fetchUser: () => {
    dispatch(fetchUser());
  },
});


export default connect(stateToProps, dispatchToProps)(Layout);
