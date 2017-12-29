import React from 'react';
import TimeAgo from 'react-timeago';
import {Link} from 'react-router-dom';
import './index.css';

const Comment = ({comment, deleteComment, currentUser, ...props}) => {
    return currentUser._id === comment.user._id ? (
        <li className="comment-container">
            <div>
                <span className="username comment-username">
                    <Link to={`/u/${comment.user._id}`}>{comment.user.surname + ' ' + comment.user.name}</Link>
                </span>
                <span className="comment-text">{comment.text}</span>
            </div>
            <span className="comment-time">
                <TimeAgo date={comment.created_on} />
            </span>
            <a className="delete-comment" onClick={() => deleteComment(`${comment._id}`)}>
                x
            </a>
        </li>
    ) : (
        <li className="comment-container">
            <div>
                <span className="username comment-username">
                    <Link to={`/u/${comment.user._id}`}>{comment.user.surname + ' ' + comment.user.name}</Link>
                </span>
                <span className="comment-text">{comment.text}</span>
            </div>
            <span className="comment-time">
                <TimeAgo date={comment.created_on} />
            </span>
        </li>
    );
};
export default Comment;
