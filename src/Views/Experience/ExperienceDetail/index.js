import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {fetchExperienceById} from '../../../assets/js/lib/tap-client';
import Media from '../../../components/Media';
import './index.css';

class ExperienceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: null,
            experienceNotFound: false
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
                this.setState({experience: experience, experienceNotFound: false});
            } else {
                this.setState({experience: experience, experienceNotFound: true});
            }
        });
    };

    render() {
        const {experience, experienceNotFound} = this.state;
        console.log(experienceNotFound);
        if (experience) {
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
                                    <Link className="experience-users" path to={`/u/${user.username}`}>
                                        <img src={user.picture.image} alt="" />
                                        <p>
                                            {user.surname} {user.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="experience-moments">
                        <p className="moments-detail-title upper">Moments</p>
                        <div>
                            <div className="experience-img-holder moment-img-holder">
                                <Media media={experience.media} />
                                <p className="detail-moment-title">{experience.title}</p>
                                <p className="detail-moment-desc">{experience.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="experience-extra">frfr</div>

                    <input type="file" />
                    <button type="submit">submit</button>
                </div>
            );
        } else return null;
    }
}

export default withRouter(ExperienceDetail);
