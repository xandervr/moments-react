import React from "react";
import ProfileCard from "../../../components/Profile/ProfileCard";

const FollowersContent = ({ profile }) => {
    console.log(profile);
    const followerList = profile.followers.map(followerProfile => (
        <ProfileCard key={followerProfile.username} profile={followerProfile} />
    ));
    console.log(followerList);
    return <div className="all-profile-card-container">{followerList}</div>;
};

export default FollowersContent;
