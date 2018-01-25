import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {fetchExperienceById, addMoment} from '../../../assets/js/lib/tap-client';
import add from '../../../assets/svg/add-white.svg';
import Media from '../../../components/Media';
import './index.css';

class ExperienceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null,
            experienceNotFound: false,
            writeAccess: false
        };
    }

    componentWillMount() {
        this.fetchExperience();
        this.mounted = true;
        this.unlisten = this.props.history.listen((location, action) => {
            if (this.mounted) {
                this.forceUpdate(() => {
                    this.fetchExperience();
                });
            }
        });
        // this.updateExperience = setInterval(() => {
        //     if (this.mounted) this.fetchExperience();
        // }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.unlisten();
        //clearInterval(this.updateExperience);
    }

    fetchExperience = () => {
        const experience_id = this.props.match.params.experience_id;
        fetchExperienceById(experience_id, experience => {
            if (experience) {
                this.setState({experience: experience, experienceNotFound: false}, () => this.checkWriteAccess());
            } else {
                this.setState({experience: experience, experienceNotFound: true});
            }
        });
    };

    checkWriteAccess = () => {
        const {experience} = this.state;
        const {user} = this.props;

        const checkOwner = () => {
            return experience.user._id === user._id;
        };

        const checkAdmin = () => {
            let result = false;
            for (const i in experience.access.admin) {
                if (experience.access.admin[i]._id === user._id) {
                    result = true;
                    break;
                }
            }
            return result;
        };

        const checkWrite = () => {
            let result = false;
            for (const i in experience.access.write) {
                if (experience.access.write[i]._id === user._id) {
                    result = true;
                    break;
                }
            }
            return result;
        };

        if (checkOwner() || checkAdmin() || checkWrite()) {
            this.setState({writeAccess: true});
        }
    };

    filesArr = [];
    fileIndex = 0;

    setupReader = file => {
        const name = file.name;
        const reader = new FileReader();
        reader.onload = e => {
            const image = e.target.result;
            const element = (
                <div key={this.fileIndex} className="add-moment-file-holder form-moment">
                    <div className="file-selector add-moment-file pointer">
                        <img className="preview-image image-preview preview-image-full" src={image} alt="" />
                    </div>
                    <div className="moment-input-info">
                        <input placeholder="Moment title" name="moment-title" />
                        <input placeholder="Moment description" name="moment-desc" />
                    </div>
                </div>
            );
            this.filesArr.push(element);
            this.fileIndex++;
            this.setState({momentsChosen: true});
        };
        reader.readAsDataURL(file);
    };

    previewUpload = ev => {
        const files = [...ev.target.files];

        if (ev.target.files && ev.target.files[0]) {
            for (let i = 0; i < files.length; i++) {
                this.setupReader(files[i]);
            }
        }
    };

    handleMomentSubmit = e => {
        e.preventDefault();
        const $form = e.currentTarget;
        const $moments = $form.querySelectorAll('.form-moment');
        const moments = [];
        for (let i = 0; i < $moments.length; i++) {
            const moment = {
                title: $moments[i].querySelector('[name="moment-title"]').value,
                desc:
                    $moments[i].querySelector('[name="moment-desc"]').value === ``
                        ? null
                        : $moments[i].querySelector('[name="moment-desc"]').value,
                file: $form.querySelector('[name="file"]').files[i]
            };
            moments.push(moment);
        }

        const {experience} = this.state;

        moments.forEach(moment => {
            addMoment(experience._id, moment);
        });
    };

    render() {
        const {experience, experienceNotFound, writeAccess, momentsChosen} = this.state;

        if (experience) {
            const editBtn = writeAccess ? <button className="">edit</button> : null;

            const addMoment = writeAccess ? (
                <form action="" className="add-moment-form" onSubmit={this.handleMomentSubmit}>
                    <div className="add-moments">
                        {momentsChosen ? this.filesArr.map(file => file) : null}
                        <div className="add-moment-file-holder">
                            <input
                                name="media"
                                className="experience-photo-input"
                                id="file"
                                type="file"
                                name="file"
                                accept="image/*, video/*"
                                onChange={this.previewUpload}
                                multiple
                            />
                            <label className="pointer" htmlFor="file">
                                <div className="file-selector add-moment-file">
                                    <img className="preview-image image-preview" src={add} alt="" />
                                </div>
                                <p className="file-label">Choose one or more moments</p>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="action upper pointer signup-btn add-moments-btn">
                        Add
                    </button>
                </form>
            ) : null;

            return (
                <div className="experience-wrapper">
                    <div className="experience-header">
                        <div className="experience-img-holder">
                            <Media media={experience.media} />
                        </div>
                        <div className="detail-experience-info">
                            <div>
                                <p className="detail-experience-title">{experience.title}</p>
                                <p className="detail-experience-desc">{experience.description}</p>
                            </div>
                            <div className="experience-actions-holder">
                                <div>
                                    Boosts <span>{experience.boosters.length}</span>
                                    <i className="fas fa-fire" />
                                </div>
                                <div>
                                    Comments <span>{experience.comments.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="experience-collabs">
                            <p className="experience-users-title">with</p>
                            <div className="experience-users-holder">
                                {experience.tagged_users.map((user, index) => (
                                    <Link key={index} to={`/u/${user.username}`} className="experience-users">
                                        <Media media={user.picture} contain />
                                        <p>
                                            {user.surname} {user.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {editBtn}
                    </div>
                    <div className="experience-moments">
                        <p className="moments-detail-title upper">Moments</p>
                        {addMoment}
                        <div className="experience-moments-holder">
                            {experience.moments.map((moment, index) => (
                                <div key={index} className="experience-moment-holder">
                                    <div className="experience-img-holder moment-img-holder">
                                        <Media media={moment.media} />
                                    </div>
                                    <p className="detail-moment-title">{moment.title}</p>
                                    <p className="detail-moment-desc">{moment.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="experience-extra">frfr</div>
                </div>
            );
        } else if (experienceNotFound) {
            return console.log('not found');
        } else return null;
    }
}

export default withRouter(ExperienceDetail);
