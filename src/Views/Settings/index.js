import React, {Component} from 'react';
import {checkUsernameAvailable, saveUserSettings} from '../../assets/js/lib/tap-client';
import './index.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            saved: false,
            usernameChanged: false
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
        const name =
            fullname
                .split(' ')
                .splice(1)
                .join(' ') || undefined;
        this.setState(
            prevState => ({
                user: {
                    ...prevState.user,
                    surname: surname,
                    name: name,
                    fullname: fullname
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
                this.setState({usernameAvailable: true, usernameChanged: true});
            } else if (username !== this.state.old_user.username) {
                this.setState({usernameAvailable: false, usernameChanged: true});
            } else {
                this.setState({usernameAvailable: true, usernameChanged: false});
            }
        });
        this.setState(
            prevState => ({
                user: {
                    ...prevState.user,
                    username: username
                }
            }),
            () => this.isChanged()
        );
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
        saveUserSettings(this.state.user, saved => {
            if (saved) this.setState({old_user: this.state.user, isChanged: false, usernameChanged: false, saved: true});
        });
        e.preventDefault();
    };

    previewUpload = ev => {
        if (ev.target.files && ev.target.files[0]) {
            var reader = new FileReader();

            reader.onload = e => {
                // if (this.isVideo(e.target.result)) {
                //   document.querySelector(`.video-preview`).classList.toggle(`hide`);
                //   document.querySelector(`.video-preview`).setAttribute(`src`, e.target.result);
                // } else {
                //   document.querySelector(`.image-preview`).setAttribute(`src`, e.target.result);
                //   document.querySelector(`.image-preview`).classList.add(`preview-image-full`);
                // }

                document.querySelector(`.image-preview`).setAttribute(`src`, e.target.result);
                // }
            };

            reader.readAsDataURL(ev.target.files[0]);
        }
    };

    render() {
        const {user} = this.props;
        return (
            <div className="overlay">
                <div className="settings-content">
                    <section className="settings-section">
                        <h2>Profile</h2>
                        <div className="settings-profile">
                            <form className="profile-form" onSubmit={this.saveSettings}>
                                <div className="profile">
                                    <div>
                                        <div className="profile-image-holder">
                                            <img className="image-preview" src={this.state.user.picture} alt="" />
                                            <p className="username">
                                                {this.state.saved ? this.state.user.username : user.username}
                                            </p>
                                        </div>
                                        <div className="img-editor">
                                            <label htmlFor="image-picker" className="pointer">
                                                Edit photo
                                            </label>
                                            <input
                                                id="image-picker"
                                                className="hide"
                                                type="file"
                                                accept="image/*"
                                                name=""
                                                onChange={this.previewUpload}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Name</label>
                                        <input value={this.state.user.fullname} onChange={this.onChangeName} />
                                    </div>
                                    <div>
                                        <label htmlFor="">Username</label>
                                        <input
                                            className={
                                                this.state.usernameChanged
                                                    ? this.state.usernameAvailable ? 'available' : 'taken'
                                                    : ''
                                            }
                                            value={this.state.user.username}
                                            onChange={this.onChangeUsername}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input type="email" value={this.state.user.email} onChange={this.onChangeEmail} />
                                    </div>
                                    <div className="privacy-input">
                                        <label htmlFor="">Account privacy</label>
                                        <select
                                            className={
                                                this.state.user.settings.profile_type === 'Public'
                                                    ? 'privacy-select privacy-public pointer'
                                                    : 'privacy-select privacy-private pointer'
                                            }
                                            value={this.state.user.settings.profile_type}
                                            name=""
                                            onChange={this.onChangePrivacy}>
                                            <option value="Private">Private</option>
                                            <option value="Public">Public</option>
                                        </select>
                                    </div>
                                    <div className="submit-holder">
                                        <button
                                            className={this.state.isChanged ? 'pointer btn-save' : 'pointer btn-save disabled'}
                                            type="submit"
                                            name="button"
                                            disabled={!this.state.isChanged}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
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
