import React, {Component} from "react";
import Add from "../Buttons/add.js";
import Settings from "../Buttons/settings";
import profile from "../../assets/img/profile.jpg";
import Search from "../Search/index";
import {Link} from "react-router-dom";
import "./index.css";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ""
        };
    }

    componentDidMount() {
        window.onscroll = e => {
            if (window.scrollY <= 0) {
                document
                    .querySelector(`nav`)
                    .classList
                    .remove(`nav-shadow`);
            } else {
                document
                    .querySelector(`nav`)
                    .classList
                    .add(`nav-shadow`);
            }
        };
    }

    onChangeSearchValue = e => {
        this.setState({searchValue: e.target.value});
    };

    render() {
        const {user} = this.props;
        return (
            <nav>
                <div className="nav-content">
                    <div className="logo flex-item pointer">Moments</div>
                    <Search
                        searchValue={this.state.searchValue}
                        onChangeSearchValue={this.onChangeSearchValue}>
                        Search
                    </Search>
                    <div className="profile-actions flex-item">
                        <div className="action add pointer">
                            <Add className="icon">add</Add>
                        </div>
                        <div className="action settings pointer">
                            <Settings className="icon"/>
                        </div>
                        <div className="action profile pointer">
                            <Link to="/profile">
                                <img src={user.picture} alt="profile"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
