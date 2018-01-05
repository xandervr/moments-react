import React from "react";
import "./index.css";

const ProfileCard = ({profile}) => {
    return (
        <div key={profile._id} className="profile-card-container">
            <img
                style={{
                width: "100%",
                borderRadius: "inherit"
            }}
                src={profile.picture}/>{" "}
            <span className="profile-card-name">{profile.fullname}</span>
            <div className="profile-card-info-container">
                <div className="profile-info-holder">
                    <p className="info-counter">12</p>
                    <p className="info-name">Followers</p>
                </div>
                <div className="profile-info-holder">
                    <p className="info-counter">11</p>
                    <p className="info-name">Moments</p>
                </div>
                <div className="profile-info-holder">
                    <p className="info-counter">11</p>
                    <p className="info-name">Boosts</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
