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
  const [ user, setUser ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    // fetch existing login token
    const token = window.localStorage.getItem('jwt');
    if (token !== undefined && token !== null) {
      // attempt to fetch posts, if we fail then stop loading and force login
      fetchPosts(token, (success, tweets=null, email=null) => {
        if (success === true && tweets !== null && email !== null) {
          setToken(token);
          setTweets(tweets);
          setUser(email);
          setLoggedIn(true);
        }
        setLoading(false);
      })
    } else {
      // no token in local memory, need to login
      setLoading(false);
    }
  }, []);

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
                  setToken(null);
                  setLoggedIn(false);
                }}>
                  Log Out
                </Button>
              </Navbar>
              <div className="header-text">
                Twitter Clone - by Eswar and Saad
              </div>
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
                      userName={user}
                      createdAt={tweet.createdAt}
                      deleteTweet={deleteTweet}
                      updateTweet={updateTweet}
                    />
                  );
                })}
              </div>
            </div>
          :
            <SignUp initialize={token => {
                setToken(token);
                fetchPosts(token, (success, tweets=null, email=null) => {
                  if (success === true && tweets !== null && email !== null) {
                    setTweets(tweets);
                    setUser(email);
                  }
                });
                setLoggedIn(true);
              }}
            />
      }
    </div>
  );
}

export default App;