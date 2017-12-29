import React from "react";
import Comment from "./Comment";

const Moments = ({
    comments,
    ...props
}) => {
    const commentsList = comments.map(comment => (<Comment key={comment._id} comment={comment}/>));
    const lastCommentId = comments.length > 0
        ? comments[comments.length - 1]
        : "";

    const otherComments = commentsList.filter(comment => comment.key !== lastCommentId._id);
    return (
        <div className="comments">
            <ul>{commentsList[commentsList.length - 1]}</ul>
            <ul className="hide">{otherComments}</ul>
            <div className="hide comment-form-holder">
                <form action="" className="comment-form">
                    <label className="username" htmlFor="comment">
                        UserName
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

export default Moments;