import React, {Component} from 'react';
import Add from '../Buttons/add.js';
import Settings from '../Buttons/settings';
import profile from '../../assets/img/profile.jpg';
import logout from '../../assets/svg/logout.svg';
import Search from '../Search/index';
import './index.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        };
    }

    componentDidMount() {
      window.onscroll = e => {
        if (window.scrollY <= 0) {
          document.querySelector(`nav`).classList.remove(`nav-shadow`);
        } else {
          document.querySelector(`nav`).classList.add(`nav-shadow`);
        }
      }
    }

    logout = () => {
      localStorage.removeItem(`moments_account`);
      //TODO fix logout
      window.location = `/login`;
    }

    onChangeSearchValue = e => {
        this.setState({searchValue: e.target.value});
    };

    render() {
        return (
            <nav>
                <div className="nav-content">
                    <div className="logo flex-item pointer">Moments</div>
                    <Search searchValue={this.state.searchValue} onChangeSearchValue={this.onChangeSearchValue}>
                        Search
                    </Search>
                    <div className="profile-actions flex-item">
                        <div className="action add pointer">
                            <Add className="icon">add</Add>
                            <div className="action-detail">Add</div>
                        </div>
                        <div className="action settings pointer">
                            <Settings className="icon" />
                            <div className="action-detail">Settings</div>
                        </div>
                        <div className="action profile pointer">
                            <img src={profile} alt="profile" />
                            <div className="action-detail profile-action-detail">Profile</div>
                        </div>
                        <div className="action logout pointer">
                          <img className="logout-svg" src={logout} onClick={this.logout} alt="logout"/>
                          <div className="action-detail">Logout</div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
