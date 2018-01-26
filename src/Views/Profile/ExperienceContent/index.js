import React, {Component, Fragment} from 'react';
import world from '../../../assets/svg/world.svg';
import map from '../../../assets/svg/map-localization.svg';
import TimelineExperience from './TimelineExperience';
import ExperienceCard from './ExperienceCard';
import InfiniteScroll from '../../../components/InfiniteScroll';
import MapContainer from '../../../components/Map';
import {fetchUserExperiencesOffset} from '../../../assets/js/lib/tap-client';

class ExperienceContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hasMore: true,
            offset: 0,
            limit: 6,
            profile: null
        };
    }

    componentDidMount() {
        this.setState({profile: this.props.profile}, this.loadWall);
        this.mounted = true;
        this.wallUpdater = setInterval(() => {
            if (this.mounted) this.updateWall();
        }, 5000);
    }

    componentWillReceiveProps(props) {
        if (props.profile.username !== this.props.profile.username || this.state.profile === null)
            this.setState({profile: props.profile, data: []}, this.loadWall);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.wallUpdater);
    }

    updateWall = () => {
        const {profile} = this.state;
        if (profile)
            fetchUserExperiencesOffset(profile._id, 0, this.state.offset + this.state.limit, wall => {
                if (wall) this.setState({data: wall});
            });
    };

    loadWall = (advance, cb) => {
        const {profile} = this.state;

        if (profile) {
            console.log('FETCHING');
            fetchUserExperiencesOffset(profile._id, this.state.offset + (advance ? advance : 0), this.state.limit, wall => {
                if (wall && wall.length > 0)
                    this.setState(
                        {
                            data: this.state.data.concat(wall),
                            offset: this.state.offset + (advance ? advance : 0),
                            hasMore: true
                        },
                        cb
                    );
                else this.setState({hasMore: false}, cb);
            });
        }
    };

    loadMore = cb => {
        this.loadWall(6, cb);
    };

    loadMoreTimeline = cb => {};

    render() {
        const {profile} = this.state;
        const {data} = this.state;
        let experienceList = null;
        let timelineList = null;
        if (profile) {
            experienceList = data.map(experience => <ExperienceCard key={experience._id} experience={experience} />);

            timelineList = data.map(experience => <TimelineExperience key={experience._id} experience={experience} />);
        }

        return (
            <Fragment>
                <div className="timeline-map-holder">
                    <section className="map-section">
                        <MapContainer experiences={data} />
                    </section>
                </div>
                <section className="experiences-section">
                    <InfiniteScroll loadMore={this.loadMore} loadMoreOffset={300}>
                        {experienceList}
                    </InfiniteScroll>
                </section>
            </Fragment>
        );
    }
}

export default ExperienceContent;
