import React, {Component} from 'react';
import './index.css';
import add from '../../../assets/svg/add-white.svg';
import {createExperience} from '../../../assets/js/lib/tap-client';
import {withRouter} from 'react-router-dom';

class ExperienceCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            location: '',
            privacy: ''
        };
    }

    submitExperience = e => {
        createExperience(e.target, created => {
            this.setState({created: created});
            if (created) this.props.history.push('/');
        });
        e.preventDefault();
    };

    getExtension = filename => {
        const parts = filename.split('.');
        return parts[parts.length - 1];
    };

    isVideo = filename => {
        console.log(filename);
        const ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                return true;
            default:
                break;
        }
        return false;
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
                document.querySelector(`.image-preview`).classList.add(`preview-image-full`);
                // }
            };

            reader.readAsDataURL(ev.target.files[0]);
        }
    };

    onChangeTitle = e => {
        const title = e.target.value;
        this.setState({title: title});
    };

    onChangeDescription = e => {
        const description = e.target.value;
        this.setState({description: description});
    };

    onChangeLocation = e => {
        const location = e.target.value;
        this.setState({location: location});
    };

    onChangePrivacy = e => {
        const privacy = e.target.value;
        this.setState({privacy: privacy});
    };

    render() {
        const {title, description, location, privacy} = this.state;

        return (
            <section className="add-experience-section">
                <h1 className="add-experience-title">New experience</h1>
                <form action="" onSubmit={this.submitExperience}>
                    <div className="experience-form">
                        <div>
                            <div className="input-holder">
                                <input name="title" id="experience-title" value={title} onChange={this.onChangeTitle} />
                                <label className="input-label" htmlFor="experience-title">
                                    Title
                                </label>
                            </div>
                            <div className="input-holder">
                                <input
                                    name="location"
                                    id="experience-location"
                                    value={location}
                                    onChange={this.onChangeLocation}
                                />
                                <label className="input-label" htmlFor="experience-location">
                                    Location
                                </label>
                            </div>
                            <div className="input-holder">
                                <textarea
                                    name="description"
                                    id="experience-desc"
                                    value={description}
                                    onChange={this.onChangeDescription}
                                />
                                <label className="input-label" htmlFor="experience-desc">
                                    Description
                                </label>
                            </div>
                            <div className="input-holder">
                                <select
                                    name="access_type"
                                    className={
                                        privacy === `public` || privacy === ``
                                            ? 'privacy-select privacy-public pointer'
                                            : 'privacy-select privacy-private pointer'
                                    }
                                    value={privacy}
                                    onChange={this.onChangePrivacy}
                                >
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <input
                                name="media"
                                className="experience-photo-input"
                                id="file"
                                type="file"
                                accept="image/*, video/*"
                                onChange={this.previewUpload}
                            />
                            <label className="pointer" htmlFor="file">
                                <div className="file-selector">
                                    <video className="preview-image video-preview preview-image-full hide" src="" />
                                    <img className="preview-image image-preview" src={add} alt="" />
                                </div>
                                <p className="file-label">Choose an experience photo</p>
                            </label>
                        </div>
                    </div>
                    {/* <h2>Add moments</h2>
                    <div className="moment-form">
                        <div className="file-selector-holder">
                            <input
                                className="experience-photo-input"
                                id="moment-file"
                                type="file"
                                accept="image/*|video/*"
                            />
                            <label className="pointer" htmlFor="moment-file">
                                <div className="file-selector">
                                    <img src={add} alt="" />
                                </div>
                                <p className="file-label">Choose a photo</p>
                            </label>
                        </div>
                        <div className="moment-inputs-holder">
                            <div className="input-holder">
                                <input id="moment-experience-title" value={title} onChange={this.onChangeTitle} />
                                <label className="input-label" htmlFor="moment-experience-title">
                                    Title
                                </label>
                            </div>
                            <div className="input-holder">
                                <input
                                    id="moment-experience-location"
                                    value={location}
                                    onChange={this.onChangeLocation}
                                />
                                <label className="input-label" htmlFor="moment-experience-location">
                                    Location
                                </label>
                            </div>
                        </div>
                    </div> */}
                    <button className="signup-btn pointer upper experience-btn" type="submit">
                        create experience
                    </button>
                </form>
            </section>
        );
    }
}

export default withRouter(ExperienceCreate);
