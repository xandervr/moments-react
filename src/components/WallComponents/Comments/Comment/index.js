import React from 'react';
import TimeAgo from 'react-timeago';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {Link} from 'react-router-dom';
import './index.css';
const regex = new RegExp(
    '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*',
    'g'
);

const checkEmojiString = text => {
    return text.replace(regex, '').replace(new RegExp(' ', 'g'), '').length === 0 && text.length <= 10;
};

const Comment = ({comment, deleteComment, currentUser, ...props}) => {
    const emoji = checkEmojiString(comment.text);
    return currentUser._id === comment.user._id ? (
        <li className="comment">
            <img alt="" src={comment.user.picture} />
            <div className="comment-container">
                <span className="username comment-username">
                    <Link to={`/u/${comment.user.username}`}>{comment.user.fullname}</Link>
                </span>
                <div className="comment-user-text">
                    <div className={emoji ? 'comment-text big-emoji' : 'comment-text'}>{comment.text}</div>
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
                    <div className={emoji ? 'comment-text big-emoji' : 'comment-text'}>{comment.text}</div>
                </div>
                <span className="comment-time">
                    <TimeAgo date={comment.created_on} minPeriod="60" formatter={buildFormatter(englishStrings)} />
                </span>
            </div>
        </li>
    );
};
export default Comment;
