import React from 'react';
import {Link} from 'react-router-dom';
import Media from '../../../components/Media';

const ProfileHeader = ({profile, profileNotFound, user, onFollow, onUnfollow}) => {
    let followButton = null;
    const followList = profile.followers.map(follower => follower._id);
    if (profile) {
        if (followList.includes(user._id)) {
            followButton = (
                <button className="action upper pointer signup-btn btn-active-following" onClick={onUnfollow}>
                    Following
                </button>
            );
        } else {
            followButton = (
                <button className="action upper pointer signup-btn" onClick={onFollow}>
                    Follow
                </button>
            );
        }
    }
    const boosts = profile.boosts;
    const moments = profile.moments;
    if (profile) {
        return (
            <section className="profile-info-section">
                <div className="profile-left">
                    <Media className="profile-header-picture" media={profile.picture} alt="" contain />
                    <div className="username-actions">
                        <h2 className="username">
                            <span>{profile.surname}</span>
                            <span>{profile.name}</span>
                        </h2>
                        <div className="profilepage-actions">
                            {profile._id !== user._id ? (
                                followButton
                            ) : (
                                <button className="action upper pointer signup-btn">Update info</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="divide-line" />
                <div className="profile-right">
                    <Link to={`/u/${profile.username}/followers`}>
                        <div className="profile-info-holder">
                            <p className="info-counter">{profile.followers.length}</p>
                            <p className="info-name">Followers</p>
                        </div>
                    </Link>
                    <Link to={`/u/${profile.username}/following`}>
                        <div className="profile-info-holder">
                            <p className="info-counter">{profile.following.length}</p>
                            <p className="info-name">Following</p>
                        </div>
                    </Link>
                    <Link to={`/u/${profile.username}`}>
                        <div className="profile-info-holder">
                            <p className="info-counter">{profile.experiences}</p>
                            <p className="info-name">Experiences</p>
                        </div>
                    </Link>
                    <div className="profile-info-holder">
                        <p className="info-counter">{moments}</p>
                        <p className="info-name">Moments</p>
                    </div>
                    <div className="profile-info-holder">
                        <p className="info-counter">{boosts}</p>
                        <p className="info-name">Boosts</p>
                    </div>
                </div>
            </section>
        );
    } else if (profileNotFound) {
        return <div className="profile-holder profile-not-found">Profile not found</div>;
    } else {
        return null;
    }
};

export default ProfileHeader;
