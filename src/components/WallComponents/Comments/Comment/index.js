import React from 'react';
import TimeAgo from 'react-timeago';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {Link} from 'react-router-dom';
import './index.css';

const Comment = ({comment, deleteComment, currentUser, ...props}) => {
    return currentUser._id === comment.user._id ? (
        <li className="comment">
            <img alt="" src={comment.user.picture} />
            <div className="comment-container">
                <span className="username comment-username">
                    <Link to={`/u/${comment.user.username}`}>{comment.user.fullname}</Link>
                </span>
                <div className="comment-user-text">
                    <div className="comment-text">{comment.text}</div>
                </div>
                <span className="comment-time">
                    <TimeAgo date={comment.created_on} minPeriod="60" formatter={buildFormatter(englishStrings)} />
                </span>
                <a className="delete-comment" onClick={() => deleteComment(`${comment._id}`)}>
                    <i className="fas fa-ban" />
                </a>
            </div>
        </li>
    ) : (
        <li className="comment">
            <img alt="" src={comment.user.picture} />
            <div className="comment-container">
                <span className="username comment-username">
                    <Link to={`/u/${comment.user.username}`}>{comment.user.fullname}</Link>
                </span>
                <div className="comment-user-text">
                    <div className="comment-text">{comment.text}</div>
                </div>
                <span className="comment-time">
                    <TimeAgo date={comment.created_on} minPeriod="60" formatter={buildFormatter(englishStrings)} />
                </span>
            </div>
        </li>
    );
};
export default Comment;
