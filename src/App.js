import React, { useState, useEffect } from "react";
import { Spinner } from 'react-bootstrap'

import TweetComposer from './components/TweetComposer'
import TweetCard from './components/TweetCard';

import { fetchPosts } from './services/utils';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [ tweets, setTweets ] = useState([]);
  const [ user, setUser ] = useState({email: "", id: -1});
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) {
      setUser({email: "saadnsyed@gmail.com", id: 5}); // TODO fetch this properly
      fetchPosts(5, setTweets); // TODO fetch actual user id from login
      setLoading(false);
    }
  });

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
    <div>
      <div className="product-container">
        <TweetComposer
          userId={user.id}
          addTweetToList={addTweetToList}
        />
        {loading
          ?
            <Spinner animation="border" variant="primary" />
          :
            <div>
              {tweets.map((tweet) => {
                return (
                  <TweetCard
                    key={tweet.id}
                    id={tweet.id}
                    content={tweet.content}
                    userId={user.id}
                    userName={user.email}
                    createdAt={tweet.createdAt}
                    deleteTweet={deleteTweet}
                    updateTweet={updateTweet}
                  />
                );
              })}
            </div>
        }
      </div>
    </div>
  );
}

export default App;
