import React from 'react';
import ProfileCard from '../../../components/Profile/ProfileCard';
import '../ProfileCard/index.css';

const FollowingContent = ({profile}) => {
    const followingList = profile.following.map(followingProfile => (
        <ProfileCard key={followingProfile.username} profile={followingProfile} />
    ));
    return <div className="all-profile-card-container">{followingList}</div>;
};

export default FollowingContent;
