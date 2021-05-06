import React, { useState, useEffect } from "react";
import { Spinner, Navbar, Nav, Button } from 'react-bootstrap';

import TweetComposer from './components/TweetComposer';
import TweetCard from './components/TweetCard';
import SignUp from './components/SignUp';

import { fetchPosts, login } from './services/utils';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [ tweets, setTweets ] = useState([]);
  const [ user, setUser ] = useState({email: "", id: -1});
  const [ loading, setLoading ] = useState(true);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ token, setToken ] = useState(null);

  const initialize = (token) => {
    setLoggedIn(true);
    setToken(token);
    setUser({email: "saadnsyed@gmail.com", id: 5}); // TODO fetch this properly
    fetchPosts(token, setTweets); // TODO fetch actual user id from login
  }

  useEffect(() => {
    if (loading) {
      // fetch existing login token
      const token = window.localStorage.getItem('jwt');
      console.log('token in useffect', token)
      console.log(token == undefined)
      if (token !== undefined && token !== null) {
        console.log('going through sign up flow')
        // TODO validate token by attemping to fetch posts

        // as a first step, assume this means we are logged in and good to go
        initialize(token);
      } else {
        // go through sign up flow
      }

      setLoading(false);
    }
  }, []);

  // componenDidMount() {
  //   check if a jwt exists in cookies
  //   if it exist, login
  //     if login fails, signup

  //   if it doesnt exist, signup
  //     then login

  //   after login
  //     render feed view
  // }

  // Add new tweet to the start of the list
  const addTweetToList = tweet => setTweets(state => [tweet, ...state]);

  // Filter tweets to remove the one with the specified id
  const deleteTweet = id =>
    setTweets(tweets.filter((tweet) => tweet.id !== id));

  // Find the specified tweet and update its content
  // In the future we could support updating the timestamp
  // or any other metadata associated with the tweet
  const updateTweet = (id, content) => setTweets(
      tweets.map((tweet) => {
      if (tweet.id === id) {
        const updatedTweet = {
          ...tweet,
          content: content,
        };

        return updatedTweet;
      }

      return tweet;
    })
  );

  return (
    <div className="product-container">
      {loading
        ?
          <Spinner animation="border" variant="primary" />
        : loggedIn
          ?
            <div>
              <Navbar style={{ alignItems: 'flex-start' }} fixed="top">
                <Nav className="mr-auto"></Nav>
                <Button variant="primary" onClick={() => {
                  window.localStorage.removeItem('jwt');
                  setLoggedIn(false);
                }}>
                  Log Out
                </Button>
              </Navbar>
              <TweetComposer
                token={token}
                addTweetToList={addTweetToList}
              />
              <div>
                {tweets.map((tweet) => {
                  return (
                    <TweetCard
                      key={tweet.id}
                      id={tweet.id}
                      content={tweet.content}
                      token={token}
                      userName={user.email}
                      createdAt={tweet.createdAt}
                      deleteTweet={deleteTweet}
                      updateTweet={updateTweet}
                    />
                  );
                })}
              </div>
            </div>
          :
            <SignUp initialize={initialize}/>
      }
    </div>
  );
}

export default App;