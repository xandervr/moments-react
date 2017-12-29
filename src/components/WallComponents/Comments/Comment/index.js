import React from 'react';
import TimeAgo from 'react-timeago';
import './index.css';

const Comment = ({comment, ...props}) => {
    return (
        <li className="comment-container">
            <div>
                <span className="username comment-username">{comment.user.surname + ' ' + comment.user.name}</span>
                <span className="comment-text">{comment.text}</span>
            </div>
            <span className="comment-time">
                <TimeAgo date={comment.created_on} />
            </span>
        </li>
    );
};
export default Comment;
