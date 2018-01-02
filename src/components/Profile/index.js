import React, {Component} from "react";
import "./index.css";
import {fetchUserByUsername} from "../../assets/js/lib/tap-client";
import {withRouter} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

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
    this.unlisten = this
      .props
      .history
      .listen((location, action) => {
        this.fetchProfile();
      });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  fetchProfile = () => {
    const url = window
      .location
      .href
      .split("/");
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
          followers: [
            ...profile.followers,
            user._id
          ]
        }
      }));
    } else {
      alert("you are allready following this person!");
      return;
    }
  };

  onUnfollow = () => {
    const {user} = this.props;
    const {profile} = this.state;

    if (profile.followers.includes(user._id)) {
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
  };

  render() {
    const {user} = this.props;
    const {profile, profileNotFound} = this.state;
    return (
      <div className="profile-holder">
        <ProfileHeader
          user={user}
          profile={profile}
          profileNotFound={profileNotFound}
          onFollow={this.onFollow}
          onUnfollow={this.onUnfollow}/>
      </div>
    );
  }
}

export default withRouter(Profile);
