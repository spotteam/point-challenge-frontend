import React, { useState, useEffect } from "react";
import { Spinner, Button } from 'react-bootstrap';

import TweetComposer from './components/TweetComposer';
import TweetCard from './components/TweetCard';
import SignUp from './components/SignUp';

import { fetchPosts } from './services/utils';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // Stores the tweets fetched from the backend.
  const [ tweets, setTweets ] = useState([]);

  // Stores the user's email used for sign up.
  // Used to render tweet headers since all the tweets are from the user.
  // In the future we could populate this at the tweet level when there
  // is support for following others.
  const [ user, setUser ] = useState("");

  // Used to indicate if the App is ready to load the appropriate UI -
  // either the sign up/login view or the tweet feed.
  const [ loading, setLoading ] = useState(true);

  // Stores the JWT token used for authentication.
  // Having this means the user is logged in.
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    // Fetch existing login token.
    const token = window.localStorage.getItem('jwt');
    if (token !== undefined && token !== null) {
      // Attempt to fetch posts, if we fail then stop loading and force login.
      fetchPosts(token, (success, tweets=null, email=null) => {
        if (success === true && tweets !== null && email !== null) {
          setTweets(tweets);
          setUser(email);
          setToken(token);
        }
        setLoading(false);
      })
    } else {
      // No token in local memory, need to login.
      setLoading(false);
    }
  }, []);

  // Add new tweet to the start of the list.
  const addTweetToList = tweet => setTweets(state => [tweet, ...state]);

  // Filter tweets to remove the one with the specified id.
  const deleteTweet = id =>
    setTweets(tweets.filter((tweet) => tweet.id !== id));

  // Find the specified tweet and update its content.
  // In the future we could support updating the timestamp
  // or any other metadata associated with the tweet.
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
        : token !== null
          ?
            <div className="feed-container">
              <div className="header-text">
                Twitter2 - Eswar and Saad
              </div>
              <div className="logged-in-text">
                Logged in as {user}
              </div>
              <Button
                variant="primary"
                style={{ marginBottom: '15px' }}
                onClick={() => {
                  window.localStorage.removeItem('jwt');
                  setToken(null);
                  setTweets([]);
                  setUser("");
                }}
              >
                  Log Out
                </Button>
              <TweetComposer
                token={token}
                addTweetToList={addTweetToList}
              />
              <div className="tweet-feed">
                {tweets.map((tweet) => {
                  return (
                    <TweetCard
                      key={tweet.id}
                      id={tweet.id}
                      content={tweet.content}
                      createdAt={tweet.createdAt}
                      token={token}
                      userName={user}
                      deleteTweet={deleteTweet}
                      updateTweet={updateTweet}
                    />
                  );
                })}
              </div>
            </div>
          :
            <SignUp initialize={token => {
                fetchPosts(token, (success, tweets=null, email=null) => {
                  if (success === true && tweets !== null && email !== null) {
                    setTweets(tweets);
                    setUser(email);
                  }
                });
                setToken(token);
              }}
            />
      }
    </div>
  );
}

export default App;