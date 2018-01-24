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
            experienceNotFound: false,
            writeAcces: false
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

    checkWriteAcces = () => {
        const {experience} = this.state;
        const {user} = this.props;
        console.clear();
        console.log(`userID: ${user._id}`);

        //DIT IS LELIJK

        // experience.access.admin.forEach(adminUser => {
        //     if (user._id === adminUser._id) {
        //         console.log(true);
        //         this.setState({writeAcces: true});
        //     } else {
        //         this.setState({writeAcces: false});
        //         console.log(false);
        //     }
        // });
        // experience.access.write.forEach(writeUser => {
        //     if (user._id === writeUser._id) {
        //         this.setState({writeAcces: true});
        //         console.log(true);
        //     } else {
        //         this.setState({writeAcces: false});
        //         console.log(false);
        //     }
        // });
    };

    render() {
        const {experience, experienceNotFound} = this.state;
        console.log(experienceNotFound);
        if (experience) {
            this.checkWriteAcces();
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
                    </div>
                    <div className="experience-moments">
                        <p className="moments-detail-title upper">Moments</p>
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

                    <input type="file" />
                    <button type="submit">submit</button>
                </div>
            );
        } else return null;
    }
}

export default withRouter(ExperienceDetail);
