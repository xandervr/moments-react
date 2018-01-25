import React, {Component} from 'react';
import Media from '../../components/Media';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import EXIF from 'exif-js';
import {checkUsernameAvailable, saveUserSettings, preparseImage} from '../../assets/js/lib/tap-client';
import './index.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            saved: false,
            usernameChanged: false,
            crop: {
                x: 20,
                y: 20,
                aspect: 1 / 1
            }
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
        if (user.settings.profile_type !== other.settings.profile_type || this.state.pictureUpdated) result = true;
        this.setState({isChanged: result});
    };

    onImageLoaded = image => {
        this.setState({
            crop: makeAspectCrop({x: 20, y: 20, aspect: 1 / 1, width: 60}, image.width / image.height)
        });
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

    cropImage = (croppedImage, pixels) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                crop: {
                    top: pixels.y,
                    left: pixels.x,
                    width: pixels.width,
                    height: pixels.height
                }
            },
            crop: croppedImage
        }));
    };

    saveSettings = e => {
        const {rerender} = this.props;
        saveUserSettings(this.state.user, e.target, saved => {
            if (saved) {
                this.setState({old_user: this.state.user, isChanged: false, usernameChanged: false, saved: true});
                document.location.reload();
            }
            rerender();
        });
        e.preventDefault();
    };

    previewUpload = ev => {
        ev.persist();
        if (ev.target.files && ev.target.files[0]) {
            var reader = new FileReader();
            reader.onload = e => {
                preparseImage(ev.target.files[0], data => {
                    console.log(data);
                    if (data.url) {
                        document.querySelector(`.image-preview`).setAttribute(`src`, data.url);
                        this.setState({pictureUpdated: data.url, cropSource: data.url}, this.isChanged);
                    }
                });
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
                        <ReactCrop
                            className="image-crop"
                            src={this.state.cropSource}
                            crop={this.state.crop}
                            onChange={this.cropImage}
                            minWidth={10}
                            minHeight={10}
                            onImageLoaded={this.onImageLoaded}
                            keepSelection={true}
                        />

                        <h2>Profile</h2>
                        <div className="settings-profile">
                            <form className="profile-form" onSubmit={this.saveSettings}>
                                <div className="profile">
                                    <div>
                                        <div className="profile-image-holder">
                                            <Media className="image-preview" media={this.state.user.picture} contain />
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
                                                name="media"
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
                                            onChange={this.onChangePrivacy}
                                        >
                                            <option value="Private">Private</option>
                                            <option value="Public">Public</option>
                                        </select>
                                    </div>
                                    <div className="submit-holder">
                                        <button
                                            className={this.state.isChanged ? 'pointer btn-save' : 'pointer btn-save disabled'}
                                            type="submit"
                                            name="button"
                                            disabled={!this.state.isChanged}
                                        >
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
