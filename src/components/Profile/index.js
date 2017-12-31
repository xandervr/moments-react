import React, {Component} from 'react';
import './index.css';
import {fetchUserByUsername} from '../../assets/js/lib/tap-client';
import {withRouter} from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        };
    }

    fetchProfile = () => {
        const url = window.location.href.split('/');
        const username = url.pop();
        fetchUserByUsername(username, profile => {
            this.setState({profile});
        });
    };

    componentDidMount() {
        this.fetchProfile();
        this.unlisten = this.props.history.listen((location, action) => {
            this.fetchProfile();
        });
    }

    componentWillUnmount() {
        this.unlisten();
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
                                    <span>{profile.surname}</span>
                                    <span>{profile.name}</span>
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

export default withRouter(Profile);
