import React, {Component} from 'react';
import Comment from './Comment';
import {comment, deleteComment} from '../../../assets/js/lib/tap-client';
import Emoji from '../../Emoji';
import {emojify} from 'react-emojione';
import './index.css';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        };
    }

    onSubmitComment = e => {
        const {experience} = this.props;
        e.persist();
        const removeCommentContainer = () => {
            e.target.parentNode.classList.add(`hide`);
            e.target.parentNode.querySelector(`.emoji-picker`).classList.add(`hide`);
        };
        comment(experience._id, this.state.commentText, success => {
            if (success) {
                this.setState({commentText: ''});
                removeCommentContainer();
                this.props.updateWall();
            }
        });
        e.preventDefault();
    };

    deleteComment = comment => {
        const {experience} = this.props;
        deleteComment(experience._id, comment, success => {
            if (success) this.props.updateWall();
        });
    };

    openComments = e => {
        const $comments = e.currentTarget.previousElementSibling.previousElementSibling,
            openHtml = `View less comments`,
            closedHtml = `View ${this.props.experience.comments.length - 1} other comments`;

        $comments.classList.toggle(`open-comments`);
        $comments.classList.toggle(`hide`);

        $comments.classList.contains(`open-comments`)
            ? (e.currentTarget.innerHTML = openHtml)
            : (e.currentTarget.innerHTML = closedHtml);
    };

    onChangeCommentText = e => {
        let text = e.target.value;
        text = emojify(text, {output: 'unicode'});
        this.setState({commentText: text});
    };

    addToComment = emoji => {
        this.setState({
            commentText: this.state.commentText + emoji
        });
    };

    toggleEmojiPicker = e => {
        e.target.parentNode.parentNode.parentNode.querySelector(`.emoji-picker`).classList.toggle(`hide`);
    };

    render() {
        const {comments, openComments, currentUser} = this.props;
        const commentsList = comments.map(comment => (
            <Comment key={comment._id} comment={comment} deleteComment={this.deleteComment} currentUser={currentUser} />
        ));
        const lastCommentId = comments.length > 0 ? comments[0] : '';

        const otherComments = commentsList.filter(comment => comment.key !== lastCommentId._id);
        return (
            <div className="comments">
                <ul>{commentsList[0]}</ul>
                <ul className="hide">{otherComments}</ul>
                <div className="comment-form-holder">
                    <form action="index.html" onSubmit={this.onSubmitComment} className="comment-form">
                        <div className="comment-holder">
                            <label className="user-picture" htmlFor="comment">
                                <img src={currentUser.picture} />
                            </label>
                            <input
                                id="comment"
                                value={this.state.commentText}
                                onChange={this.onChangeCommentText}
                                autoComplete="off"
                                placeholder="Add a comment..."
                            />
                            <a onClick={this.toggleEmojiPicker}>😀</a>
                        </div>
                    </form>
                    <span className="emoji-picker hide">
                        <Emoji addToComment={this.addToComment} />
                    </span>
                </div>
                <p className="pointer" onClick={this.openComments}>
                    {comments.length - 1 > 0 ? `View ${otherComments.length} other comments` : ''}
                </p>
            </div>
        );
    }
}

export default Comments;
