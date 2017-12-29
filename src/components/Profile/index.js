import React, {Component} from 'react';
import './index.css';

class Profile extends Component {
  state = {}
  render() {

    const {user} = this.props;
    console.log(user);

    return (
      <div className="profile-holder">
        <section className="profile-info-section">
          <div className="profile-left">
            <img className="profile" src={user.picture} alt=""/>
            <div className="username-actions">
              <h2 className="username">{user.surname} {user.name}</h2>
              <div className="profilepage-actions">
                <button className="action upper pointer signup-btn">Update info</button>
                {/* <button className="action upper">Follow</button> */}
              </div>
            </div>
          </div>
          <div className="divide-line"></div>
          <div className="profile-right">
            <div className="profile-info-holder">
              <p className="info-counter">{user.followers.length}</p>
              <p className="info-name">Followers</p>
            </div>
            <div className="profile-info-holder">
              <p className="info-counter">{user.following.length}</p>
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
  }
}

export default Profile;
