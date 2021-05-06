
import React, { useState } from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import Button from 'react-bootstrap/Button';

import { createPost } from '../../services/utils';

import './index.css';

function TweetComposer(props) {

  const [tweet, setTweet] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    createPost(props.userId, tweet, props.addTweetToList);
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
  userId: PropTypes.number.isRequired,
}

export default TweetComposer;
