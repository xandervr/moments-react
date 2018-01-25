import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseIn: false
        };
    }

    mouseIn = e => {
        this.setState({ mouseIn: true });
        e.preventDefault();
    };

    mouseOut = e => {
        this.setState({ mouseIn: false });
        e.preventDefault();
    };

    render() {
        const { profile } = this.props;
        return (
            <Link
                className="profile-card-container"
                to={`/u/${profile.username}`}
            >
                <img
                    className="profile-card-img"
                    src={profile.picture && profile.picture.image}
                    alt=""
                />
                <div
                    onMouseEnter={this.mouseIn}
                    onMouseLeave={this.mouseOut}
                    className="profile-card-overlay"
                >
                    {this.state.mouseIn ? (
                        <span className="profile-card-name">
                            {profile.fullname}
                        </span>
                    ) : null}
                    {/* <div className="profile-card-info-container">
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
                </div> */}
                </div>
            </Link>
        );
    }
}

export default ProfileCard;
