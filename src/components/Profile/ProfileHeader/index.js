import React, {Component} from "react";

const ProfileHeader = ({profile, profileNotFound, user, onFollow, onUnfollow}) => {
    let followButton = null;
    if (profile) {
        if (profile.followers.includes(user._id)) {
            followButton = (
                <button
                    className="action upper pointer signup-btn btn-active-following"
                    onClick={onUnfollow}>
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
    if (profile) {
        return (
            <section className="profile-info-section">
                <div className="profile-left">
                    <img className="profile" src={profile.picture} alt=""/>
                    <div className="username-actions">
                        <h2 className="username">
                            <span>{profile.surname}</span>
                            <span>{profile.name}</span>
                        </h2>
                        <div className="profilepage-actions">
                            <button className="action upper pointer signup-btn">
                                Update info
                            </button>
                            {profile._id !== user._id
                                ? followButton
                                : null}
                        </div>
                    </div>
                </div>
                <div className="divide-line"/>
                <div className="profile-right">
                    <div className="profile-info-holder">
                        <p className="info-counter">
                            {profile.followers.length}
                        </p>
                        <p className="info-name">Followers</p>
                    </div>
                    <div className="profile-info-holder">
                        <p className="info-counter">
                            {profile.following.length}
                        </p>
                        <p className="info-name">Following</p>
                    </div>
                    <div className="profile-info-holder">
                        <p className="info-counter">1</p>
                        <p className="info-name">Experiences</p>
                    </div>
                    <div className="profile-info-holder">
                        <p className="info-counter">1</p>
                        <p className="info-name">Moments</p>
                    </div>
                </div>
            </section>
        );
    } else if (profileNotFound) {
        return (
            <div className="profile-holder profile-not-found">
                Profile not found
            </div>
        );
    } else {
        return null;
    }
};

export default ProfileHeader;
