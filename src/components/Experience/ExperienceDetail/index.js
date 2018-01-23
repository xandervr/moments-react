import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {fetchExperienceById} from '../../../assets/js/lib/tap-client';
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
        const {authentication, user} = this.props;
        const {experience, experienceNotFound} = this.state;
        if (experience) {
            return <p style={{marginTop: '200px'}}>{experience.title}</p>;
        } else return null;
    }
}

export default withRouter(ExperienceDetail);
