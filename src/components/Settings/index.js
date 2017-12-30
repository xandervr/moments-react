import React, {Component} from 'react';
import {checkUsernameAvailable} from '../../assets/js/lib/tap-client';
import './index.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false
        };
    }

    componentWillMount() {
        const {user} = this.props;
        this.setState({user: user, old_user: user});
    }

    isChanged = () => {
        const user = this.state.user;
        const other = this.state.old_user;
        const keys = Object.keys(user);
        let result = false;
        for (let i = 0; i < keys.length; i++) {
            if (user[keys[i]] !== other[keys[i]] && keys[i] !== 'settings') {
                result = true;
                break;
            }
        }
        if (user.settings.profile_type !== other.settings.profile_type) result = true;

        this.setState({isChanged: result});
    };

    onChangeName = e => {
        const fullname = e.target.value;
        const surname = fullname.split(' ')[0];
        const name = fullname
            .split(' ')
            .splice(1)
            .join(' ');
        this.setState(
            prevState => ({
                user: {
                    ...prevState.user,
                    surname: surname,
                    name: name
                }
            }),
            () => this.isChanged()
        );
    };

    onChangeUsername = e => {
        const username = e.target.value;
        e.persist();
        checkUsernameAvailable(username, available => {
            if (available) {
                e.target.classList.add('available');
                this.setState({usernameAvailable: true});
            } else if (username !== this.state.old_user.username) {
                e.target.classList.add('taken');
                this.setState({usernameAvailable: false});
            } else {
                e.target.classList.remove('available');
                e.target.classList.remove('taken');
                this.setState({usernameAvailable: true});
            }
        });
        this.setState(prevState => ({user: {...prevState.user, username: username}}), () => this.isChanged());
    };

    onChangeEmail = e => {
        const email = e.target.value;
        this.setState(
            prevState => ({
                user: {
                    ...prevState.user,
                    email: email
                }
            }),
            () => this.isChanged()
        );
    };

    onChangePrivacy = e => {
        const profile_type = e.target.value;
        this.setState(
            prevState => ({
                user: {
                    ...prevState.user,
                    settings: {
                        ...prevState.user.settings,
                        profile_type: profile_type
                    }
                }
            }),
            () => this.isChanged()
        );
    };

    saveSettings = e => {
        e.preventDefault();
    };

    render() {
        const {user} = this.props;
        return (
            <div className="overlay">
                <div className="settings-content">
                    <section className="settings-section">
                        <h2>Profile</h2>
                        <div className="settings-profile">
                            <div className="profile">
                                <div>
                                    <img src={this.state.user.picture} alt="" />
                                    <div className="img-editor">
                                        <label forhtml="image-picker" className="pointer">
                                            Edit photo
                                        </label>
                                        <input
                                            id="image-picker"
                                            className="hide"
                                            type="file"
                                            accept="image/*"
                                            name=""
                                            value=""
                                        />
                                    </div>
                                </div>
                                <p className="username">{user.username}</p>
                            </div>
                            <div className="">
                                <form className="profile-form" onSubmit={this.saveSettings} action="index.html">
                                    <div>
                                        <label forhtml="">Name</label>
                                        <input
                                            value={this.state.user.surname + ' ' + this.state.user.name}
                                            onChange={this.onChangeName}
                                        />
                                    </div>
                                    <div>
                                        <label forhtml="">Username</label>
                                        <input value={this.state.user.username} onChange={this.onChangeUsername} />
                                    </div>
                                    <div>
                                        <label forhtml="">Email</label>
                                        <input
                                            type="email"
                                            value={this.state.user.email}
                                            onChange={this.onChangeEmail}
                                        />
                                    </div>
                                    <div className="privacy-input">
                                        <label forhtml="">Account privacy</label>
                                        <select
                                            className="privacy-select pointer"
                                            value={this.state.user.settings.profile_type}
                                            name=""
                                            onChange={this.onChangePrivacy}
                                        >
                                            <option value="Private">Private</option>
                                            <option value="Public">Public</option>
                                        </select>
                                    </div>
                                    <div className="submit-holder">
                                        <button
                                            className={
                                                this.state.isChanged ? 'pointer btn-save' : 'pointer btn-save disabled'
                                            }
                                            type="submit"
                                            name="button"
                                            disabled={!this.state.isChanged}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                    <section className="settings-section">
                        <h2>Notifications</h2>
                        <div className="settings-profile" />
                    </section>
                </div>
            </div>
        );
    }
}

export default Settings;
