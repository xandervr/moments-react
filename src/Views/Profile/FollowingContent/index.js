import React from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";

const FollowingContent = ({ profile }) => {
    const followingList = profile.following.map(followingProfile => (
        <ProfileCard
            key={followingProfile.username}
            profile={followingProfile}
        />
    ));
    return <div className="all-profile-card-container">{followingList}</div>;
};

export default FollowingContent;
