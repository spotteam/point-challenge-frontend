import React, { useState } from "react";

import TweetComposer from './components/TweetComposer'
import TweetCard from './components/TweetCard';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialTweets = [
    {
      id: 0,
      createdAt: 1620175459279,
      user: "saadnsyed",
      content: "Star wars is dope",
    },
    {
      id: 1,
      createdAt: 1620175505184,
      user: "saadnsyed",
      content: "I like fish",
    },
    {
      id: 2,
      createdAt: 1620175509878,
      user: "saadnsyed",
      content: "Curry is going offfff",
    },
    {
      id: 3,
      createdAt: 1620175515369,
      user: "saadnsyed",
      content: "Whos tryna hoop this weekend??",
    },
  ]
  
  const [ tweets, setTweets ] = useState(initialTweets);

  const addTweetToList = tweet => setTweets(state => [tweet, ...state])
  const deleteTweet = id => {
    const newList = tweets.filter((tweet) => tweet.id !== id);
    setTweets(newList);
  }
  const updateTweet = (id, content) => {
    const newList = tweets.map((tweet) => {
      if (tweet.id === id) {
        const updatedTweet = {
          ...tweet,
          content: content,
        };
 
        return updatedTweet;
      }
 
      return tweet;
    });
 
    setTweets(newList);
  }

  return (
    <div>
      <div className="product-container">
        <TweetComposer addTweetToList={addTweetToList}/>
        <div>
          {tweets.map((tweet) => {
            return (
              <TweetCard
                key={tweet.id}
                id={tweet.id}
                content={tweet.content}
                user={tweet.user}
                createdAt={tweet.createdAt}
                deleteTweet={deleteTweet}
                updateTweet={updateTweet}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
