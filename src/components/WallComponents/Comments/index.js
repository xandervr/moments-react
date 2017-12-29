import React, {Component} from 'react';
import Comment from './Comment';
import {comment} from '../../../assets/js/lib/tap-client';

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
        this.setState({commentText: e.target.value});
    };

    render() {
        const {comments, openComments} = this.props;
        const commentsList = comments.map(comment => <Comment key={comment._id} comment={comment} />);
        const lastCommentId = comments.length > 0 ? comments[0] : '';

        const otherComments = commentsList.filter(comment => comment.key !== lastCommentId._id);
        return (
            <div className="comments">
                <ul>{commentsList[0]}</ul>
                <ul className="hide">{otherComments}</ul>
                <div className="hide comment-form-holder">
                    <form action="index.html" onSubmit={this.onSubmitComment} className="comment-form">
                        <label className="username" htmlFor="comment">
                            Me :
                        </label>
                        <input
                            id="comment"
                            value={this.state.commentText}
                            onChange={this.onChangeCommentText}
                            autoComplete="off"
                        />
                    </form>
                </div>
                <p className="pointer" onClick={this.openComments}>
                    {comments.length - 1 > 0 ? `View ${otherComments.length} other comments` : ''}
                </p>
            </div>
        );
    }
}

export default Comments;
