import React from "react";
import Comment from "./Comment";

const Comments = ({
    comments,
    ...props
}) => {
    const commentsList = comments.map(comment => (<Comment key={comment._id} comment={comment}/>));
    const lastCommentId = comments.length > 0
        ? comments[0]
        : "";

    const otherComments = commentsList.filter(comment => comment.key !== lastCommentId._id);
    return (
        <div className="comments">
            <ul>{commentsList[0]}</ul>
            <ul className="hide">{otherComments}</ul>
            <div className="hide comment-form-holder">
                <form action="" className="comment-form">
                    <label className="username" htmlFor="comment">
                        Me :
                    </label>
                    <input id="comment" autoComplete="off"/>
                </form>
            </div>
            <p className="pointer" onClick={props.openComments}>
                {comments.length - 1 > 0
                    ? `View ${otherComments.length} other comments`
                    : ""}
            </p>
        </div>
    );
};

export default Comments;
