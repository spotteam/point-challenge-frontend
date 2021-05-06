
import React, { useState } from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

import { editPost, deletePost } from '../../services/utils';

import { ReactComponent as TrashIcon } from '../../assets/noun_Trash_3775172.svg';
import { ReactComponent as EditIcon } from '../../assets/noun_note_3774598.svg';
import { ReactComponent as SaveIcon } from '../../assets/noun_Save_3560739.svg';

import './index.css';

function TweetCard(props) {

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(props.content);

  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <div className="tweet-user">
          {props.userName}
        </div>
        <div>
          {(new Date(props.createdAt)).toLocaleString()}
        </div>
      </div>
      <div className="tweet-body">
        <div style={{ flexGrow: 1 }}>
          <TextareaAutosize
            className="tweet-content"
            style={{
              borderColor: editing ? "black" : "transparent",
            }}
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={!editing}
          />
        </div>
        <div className="tweet-actions">
          {editing
            ?
              <SaveIcon
                className="save-icon"
                style={{ marginRight: '5px' }}
                onClick={e => {
                  editPost(props.userId, props.id, content, props.updateTweet);
                  setEditing(false);
                }}
              />
            :
              <EditIcon
                className="edit-icon"
                style={{ marginRight: '5px' }}
                onClick={e => {
                  setEditing(true);
                }}
              />
          }
          <TrashIcon
            className="delete-icon"
            onClick={e => {
              deletePost(props.userId, props.id, props.deleteTweet);
            }}
          />
        </div>
      </div>
    </div>
  );
}

TweetCard.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  deleteTweet: PropTypes.func.isRequired,
  updateTweet: PropTypes.func.isRequired,
}

export default TweetCard;
