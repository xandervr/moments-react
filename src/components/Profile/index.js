import React, {Component} from 'react';
import './index.css';
import {fetchUserByUsername} from '../../assets/js/lib/tap-client';
import {withRouter} from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            profileNotFound: false
        };
    }

    fetchProfile = () => {
        const url = window.location.href.split('/');
        const username = url.pop();
        fetchUserByUsername(username, profile => {
            if (profile) {
                this.setState({profile: profile, profileNotFound: false});
            } else {
                this.setState({profile: profile, profileNotFound: true});
            }
        });
    };

    onFollow = () => {
        const {user} = this.props;
        const {profile} = this.state;
        if (!profile.followers.includes(user._id)) {
            this.setState((prevState, props) => ({
                profile: {
                    ...prevState.profile,
                    followers: [...profile.followers, user._id]
                }
            }));
        } else {
            alert('you are allready following this person!');
            return;
        }
    };

    componentDidMount() {
        this.fetchProfile();
        this.unlisten = this.props.history.listen((location, action) => {
            this.fetchProfile();
        });
        this.mounted = true;
        this.updateProfile = setInterval(() => {
            if (this.mounted) this.fetchProfile();
        }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.updateProfile);
        this.unlisten();
    }

    render() {
        const {user} = this.props;
        const {profile, profileNotFound} = this.state;
        let followButton = null;
        if (profile) {
            if (profile.followers.includes(user._id)) {
                followButton = (
                    <button className="action upper pointer signup-btn btn-active-following">Following</button>
                );
            } else {
                followButton = (
                    <button className="action upper pointer signup-btn" onClick={this.onFollow}>
                        Follow
                    </button>
                );
            }
        }

        if (profile) {
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
                                    {profile._id !== user._id ? followButton : null}
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
        } else if (profileNotFound) {
            return <div className="profile-holder profile-not-found">Profile not found</div>;
        } else {
            return null;
        }
    }
}

export default withRouter(Profile);
