import React, {Component} from 'react';
import {search} from '../../assets/js/lib/tap-client';
import Add from '../Buttons/add.js';
import Settings from '../Buttons/settings';
import Search from '../Search/index';
import SearchResults from '../SearchResults/index';
import logout from '../../assets/svg/logout.svg';
import {Link} from 'react-router-dom';
import './index.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            lockSearch: false,
            searchResults: {
                experiences: [],
                users: []
            },
            showResults: false
        };
    }

    componentDidMount() {
        window.onscroll = e => {
            const $nav = document.querySelector(`nav`);
            if (window.scrollY <= 0) {
                if ($nav) $nav.classList.remove(`nav-shadow`);
            } else {
                if ($nav) $nav.classList.add(`nav-shadow`);
            }
        };
    }

    logout = () => {
        localStorage.removeItem(`moments_account`);
        //TODO fix logout
        window.location = `/login`;
    };

    performSearch = query => {
        this.setState({lockSearch: true});
        search(query, data => {
            if (data)
                this.setState({
                    searchResults: data.results,
                    lockSearch: false,
                    showResults: true
                });
            else
                this.setState({
                    searchResults: {
                        experiences: [],
                        users: []
                    },
                    lockSearch: false,
                    showResults: false
                });
        });
    };

    hideResults = e => {
        this.setState({showResults: false, searchValue: ''});
    };

    onChangeSearchValue = e => {
        const searchValue = e.target.value;
        this.setState({searchValue: searchValue}, () => {
            if (this.state.searchValue.length >= 2 && !this.state.lockSearch)
                this.performSearch(this.state.searchValue);
            else this.setState({searchResults: {experiences: [], users: []}, showResults: false});
        });
    };

    render() {
        const {user} = this.props;
        return (
            <nav>
                <div className="nav-content">
                    <div className="logo flex-item pointer">
                        <Link to="/">Moments</Link>
                    </div>
                    <div className="search-container">
                        <Search
                            searchResultsExperiences={this.state.searchResults.experiences}
                            searchResultsUsers={this.state.searchResults.users}
                            searchValue={this.state.searchValue}
                            onChangeSearchValue={this.onChangeSearchValue}
                        >
                            Search
                        </Search>
                        {this.state.showResults ? (
                            <SearchResults
                                experienceResults={this.state.searchResults.experiences}
                                userResults={this.state.searchResults.users}
                                hideResults={this.hideResults}
                            />
                        ) : null}
                    </div>
                    <div className="profile-actions flex-item">
                        <div className="action add pointer">
                          <Link to="/create-experience">
                            <Add className="icon">add</Add>
                            <div className="action-detail">Add</div>
                          </Link>
                        </div>
                        <div className="action settings pointer">
                            <Link to="/settings">
                                <Settings className="icon" />
                            </Link>
                            <div className="action-detail">Settings</div>
                        </div>
                        <div className="action profile pointer">
                            <Link to={`/u/${user.username}`}>
                                <img src={user.picture} alt="profile" />
                            </Link>
                            <div className="action-detail profile-action-detail">Profile</div>
                        </div>
                        <div className="action logout pointer">
                            <img className="logout-svg" src={logout} onClick={this.logout} alt="logout" />
                            <div className="action-detail">Logout</div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
