import React from "react";

const Comment = ({
    comment,
    ...props
}) => {
    return (
        <li>
            <span className="username">
                {comment.user.surname + " " + comment.user.name}
            </span>&nbsp;&nbsp;{comment.text}
        </li>
    );
};

export default Comment;
