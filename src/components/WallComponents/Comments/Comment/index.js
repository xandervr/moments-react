import React from "react";
import TimeAgo from "react-timeago";

const Comment = ({
    comment,
    ...props
}) => {
    return (
        <li>
            <span className="username">
                {comment.user.surname + " " + comment.user.name}
            </span>
            {comment.text}
            <TimeAgo
                style={{
                marginLeft: "4rem",
                fontSize: "1.4rem"
            }}
                date={comment.created_on}/>
        </li>
    );
};
export default Comment;
