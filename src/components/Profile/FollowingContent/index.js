import React from "react";
import ProfileCard from "../ProfileCard";

const FollowingContent = ({profile}) => {
    const followingList = profile
        .following
        .map(followingProfile => (<ProfileCard profile={followingProfile}/>));
    return <div style={{
        display: "flex"
    }}>{followingList}</div>;
};

export default FollowingContent;
