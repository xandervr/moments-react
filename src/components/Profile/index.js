import React, {Component} from 'react';
import './index.css';

class Profile extends Component {
  state = {}
  render() {

    const {user} = this.props;

    return (
      <div className="profile-holder">
        <section className="profile-info-section">
          <div className="profile-left">
            <img className="profile" src={user.picture} alt=""/>
            <div className="username-actions">
              <h2>{user.name} {user.surname}</h2>
              <div className="profile-actions">
                <button className="action upper">Update info</button>
                <button className="action upper"></button>
              </div>
            </div>
          </div>
          <div className="profile-right">

          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
