import React, {Component} from "react";
import "./index.css";
import {fetchUserByUsername} from "../../assets/js/lib/tap-client";
import {withRouter} from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };
  }
    
    componentDidMount() {
        this.fetchProfile();
        this.mounted = true;
        this.unlisten = this.props.history.listen((location, action) => {
                                                  if (this.mounted) this.fetchProfile();
                                                  });


  fetchProfile = () => {
    const url = window
      .location
      .href
      .split("/");
    const username = url.pop();
    fetchUserByUsername(username, profile => {
      this.setState({profile: profile});
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

    componentWillUnmount() {
        this.mounted = false;
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
                                    <span>{profile.fullname}</span>
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
        </div>
      );
    } else 
      return null;
    }
  }

export default withRouter(Profile);
