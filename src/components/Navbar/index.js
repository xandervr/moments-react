import React, {Component} from 'react';
import Add from '../../assets/svg/add.js';
import Settings from '../../assets/svg/settings';
import profile from '../../assets/svg/profile.jpg';
import Search from '../Search/index';
import "./index.css";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
        }
    }

    onChangeSearchValue = e => {
        this.setState({searchValue: e.target.value});
    };

    render() {
        return (
            <nav>
                <div className="nav-content">
                    <div className="logo flex-item">Moments</div>
                    <Search searchValue={this.state.searchValue} onChangeSearchValue={this.onChangeSearchValue}>Search</Search>
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