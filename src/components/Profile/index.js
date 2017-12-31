import React, {Component} from 'react';
import './index.css';
import {fetchUserByUsername} from '../../assets/js/lib/tap-client';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        };
    }

    componentDidMount() {
        const url = window.location.href.split('/');
        const username = url.pop();
        fetchUserByUsername(username, profile => {
            this.setState({profile});
        });
    }

    render() {
        const {user} = this.props;
        const {profile} = this.state;
        if (this.state.profile) {
            return (
                <div className="profile-holder">
                    <section className="profile-info-section">
                        <div className="profile-left">
                            <img className="profile" src={profile.picture} alt="" />
                            <div className="username-actions">
                                <h2 className="username">
                                    {profile.surname}
                                    {profile.name}
                                </h2>
                                <div className="profilepage-actions">
                                    <button className="action upper pointer signup-btn">Update info</button>
                                    {/* <button className="action upper">Follow</button> */}
                                </div>
                            </div>
                        </div>
                        <div className="divide-line" />
                        <div className="profile-right">
                            <div className="profile-info-holder">
                                <p className="info-counter">{profile.followers.length}</p>
                                <p className="info-name">Followers</p>
                            </div>
                            <div className="profile-info-holder">
                                <p className="info-counter">{profile.following.length}</p>
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
                </div>
            );
        } else return null;
    }
}

export default Profile;
