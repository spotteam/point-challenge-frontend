
import React, { useState } from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

import Button from 'react-bootstrap/Button';

import './index.css'

function TweetComposer(props) {

  const [tweet, setTweet] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(tweet);
    props.addTweetToList({
      id: Date.now(), // TODO change this to id from backend
      createdAt: Date.now(),
      user: "saadnsyed",
      content: tweet,
    });
    setTweet("");
  }

  return (
    <div className="composer-card">
      <TextareaAutosize
        className="tweet-composer"
        placeholder="What's on your mind?"
        value={tweet}
        minRows={2}
        onChange={e => {
          setTweet(e.target.value);
        }}
      />
      <Button
        className="tweet-button"
        variant="primary"
        onClick={handleSubmit}
      >
        Tweet
      </Button>
    </div>
  );
}

TweetComposer.propTypes = {
  addTweetToList: PropTypes.func.isRequired,
}

export default TweetComposer;
