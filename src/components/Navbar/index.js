import React, {Component} from 'react';
import {search, fetchNotifications} from '../../assets/js/lib/tap-client';
import settingsIcon from '../../assets/svg/settings.svg';
import addIcon from '../../assets/svg/add.svg';
import notificationsIcon from '../../assets/svg/notification.svg';
import Search from './Search/index';
import Notifications from './Notifications/index';
import Media from '../Media';
import SearchResults from './SearchResults/index';
import logout from '../../assets/svg/logout.svg';
import {Link} from 'react-router-dom';
import ParticleHolder from '../ParticleHolder';

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
            showResults: false,
            notifications: [],
            showNotifications: false
        };
    }

    handleKeyDown = e => {
        const keyName = e.key;
        switch (keyName) {
            case `ArrowDown`:
                console.log(`down`);
                break;
            case `ArrowUp`:
                console.log(`up`);
                break;
            default:
                break;
        }
    };

    componentDidMount() {
        window.onscroll = e => {
            const $nav = document.querySelector(`nav`);
            if (window.scrollY <= 0) {
                if ($nav) $nav.classList.remove(`nav-shadow`);
            } else {
                if ($nav) $nav.classList.add(`nav-shadow`);
            }
        };
        fetchNotifications(0, 5, data => data !== false && this.setState({notifications: data}));
        this.mounted = true;
        this.notificationsUpdater = setInterval(() => {
            if (this.mounted) fetchNotifications(0, 5, data => data !== false && this.setState({notifications: data}));
        }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.notificationsUpdater);
    }

    logout = () => {
        localStorage.removeItem(`moments_account`);
        window.location = `/login`;
    };

    performSearch = query => {
        this.setState({lockSearch: true});
        search(query, data => {
            if (data) this.setState({searchResults: data.results, lockSearch: false, showResults: true});
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
        this.setState(
            {
                searchValue: searchValue
            },
            () => {
                if (this.state.searchValue.length >= 2 && !this.state.lockSearch) this.performSearch(this.state.searchValue);
                else
                    this.setState({
                        searchResults: {
                            experiences: [],
                            users: []
                        },
                        showResults: false
                    });
            }
        );
    };

    handleShowNotifications = () => {
        if (this.state.showNotifications) {
            this.setState({showNotifications: false});
        } else {
            this.setState({showNotifications: true});
        }
    };

    render() {
        const {user} = this.props;
        const {notifications, showNotifications} = this.state;
        console.log(notifications);
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
                            onKeyDown={this.handleKeyDown}>
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
                        <div className="action notification pointer">
                            <img
                                className="notifications-svg action-img"
                                onClick={this.handleShowNotifications}
                                src={notificationsIcon}
                                alt=""
                            />
                            <div className="notifications-badge">{notifications.length}</div>
                            <div className="action-detail">Notifications</div>
                        </div>
                        {showNotifications && <Notifications notifications={notifications} />}
                        <div className="action add pointer">
                            <Link to="/create-experience">
                                <img className="action-img" src={addIcon} alt="" />
                            </Link>
                            <div className="action-detail">Add</div>
                        </div>
                        <div className="action settings pointer">
                            <Link to="/settings">
                                <img className="settings-svg action-img" src={settingsIcon} alt="" />
                            </Link>
                            <div className="action-detail">Settings</div>
                        </div>
                        <div className="action profile pointer">
                            <Link to={`/u/${user.username}`}>
                                {user.picture ? (
                                    <Media media={user.picture} className="profile-img-nav action-img" alt="profile" contain />
                                ) : (
                                    <ParticleHolder className="navbar-particle" />
                                )}
                            </Link>
                            <div className="action-detail profile-action-detail">Profile</div>
                        </div>
                        <div className="action logout pointer">
                            <img className="logout-svg action-img" src={logout} onClick={this.logout} alt="logout" />
                            <div className="action-detail">Logout</div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
