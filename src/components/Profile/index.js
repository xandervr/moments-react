import React, {Component} from "react";
import "./index.css";
import {fetchUserByUsername, unfollowUser, followUser} from "../../assets/js/lib/tap-client";
import {withRouter} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ExperienceContent from "./ExperienceContent";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      profileNotFound: false
    };
  }

  componentDidMount() {
    this.fetchProfile();
    this.mounted = true;
    this.unlisten = this
      .props
      .history
      .listen((location, action) => {
        if (this.mounted) 
          this.fetchProfile();
        }
      );
    this.updateProfile = setInterval(() => {
      if (this.mounted) 
        this.fetchProfile();
      }
    , 5000);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unlisten();
    clearInterval(this.updateProfile);
  }

  fetchProfile = () => {
    const username = this.props.match.params.username;
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
    followUser(profile._id, followed => {
      if (!profile.followers.includes(user._id) && followed) {
        this.setState((prevState, props) => ({
          profile: {
            ...prevState.profile,
            followers: [
              ...prevState.profile.followers,
              user._id
            ]
          }
        }));
      } else {
        alert("you are allready following this person!");
        return;
      }
    });
  };

  onUnfollow = () => {
    const {user} = this.props;
    const {profile} = this.state;
    unfollowUser(profile._id, unfollowed => {
      if (profile.followers.includes(user._id) && unfollowed) {
        this.setState((prevState, props) => ({
          profile: {
            ...prevState.profile,
            followers: prevState
              .profile
              .followers
              .filter(follower => follower !== user._id)
          }
        }));
      } else {
        alert("you are not allready following this person!");
        return;
      }
    });
  };

  render() {
    const {user, content} = this.props;
    const {profile, profileNotFound} = this.state;
    const profileContent = (<ExperienceContent profile={profile} user={user}/>);
    return (
      <div className="profile-holder">
        <ProfileHeader
          user={user}
          profile={profile}
          profileNotFound={profileNotFound}
          onFollow={this.onFollow}
          onUnfollow={this.onUnfollow}/>{" "} {profileContent}
      </div>
    );
  }
}

export default withRouter(Profile);
