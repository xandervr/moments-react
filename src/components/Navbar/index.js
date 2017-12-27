import React, {Component} from 'react';
import Add from '../../svg/add.js';
import Settings from '../../svg/settings';
import profile from '../../svg/profile.jpg';
import "./index.css";

class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-content">
                    <div className="logo flex-item">Moments</div>
                    <div className="search flex-item">
                        <div className="input-holder">
                            <input type="search" name="search" placeholder="Search"></input>
                        </div>
                    </div>
                    <div className="profile-actions flex-item">
                        <div className="action add">
                            <Add className="icon">add</Add>
                        </div>
                        <div className="action settings">
                            <Settings className="icon"/>
                        </div>
                        <div className="action profile">
                            <a>
                                <img src={profile} alt="profile"/>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;