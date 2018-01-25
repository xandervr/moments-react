import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import Media from '../../Media';
import ParticleHolder from '../../ParticleHolder';

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseIn: false
        };
    }

    mouseIn = e => {
        this.setState({mouseIn: true});
        e.preventDefault();
    };

    mouseOut = e => {
        this.setState({mouseIn: false});
        e.preventDefault();
    };

    render() {
        const {profile} = this.props;
        return (
            <Link className="profile-card-container" to={`/u/${profile.username}`}>
                {profile.picture ? (
                    <Media className="profile-card-img" media={profile.picture} alt="" />
                ) : (
                    <ParticleHolder className="card-particle" particles={20} full />
                )}
                <div onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut} className="profile-card-overlay">
                    {this.state.mouseIn ? <span className="profile-card-name">{profile.fullname}</span> : null}
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
