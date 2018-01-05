import React from "react";

const FollowingContent = ({profile}) => {
    const followingList = profile
        .following
        .map(followingProfile => (
            <div style={{
                fontSize: "4rem"
            }}>
                <img
                    style={{
                    width: "20%",
                    height: "20%"
                }}
                    src={followingProfile.picture}/>{" "} {followingProfile.fullname}
            </div>
        ));
    return <div>{followingList}</div>;
};

export default FollowingContent;
