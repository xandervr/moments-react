import React from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";

const FollowersContent = ({ profile }) => {
    const followerList = profile.following.map(followerProfile => (
        <ProfileCard key={followerProfile.username} profile={followerProfile} />
    ));
    return <div className="all-profile-card-container">{followerList}</div>;
};

export default FollowersContent;
