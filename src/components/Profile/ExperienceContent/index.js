import React, {Component} from 'react';
import timelineBorder from '../../../assets/img/timeline-border.png';
import world from '../../../assets/svg/world.svg';
import map from '../../../assets/svg/map-localization.svg';
import TimelineExperience from './TimelineExperience';
import ExperienceCard from './ExperienceCard';
import InfiniteScroll from '../../InfiniteScroll';
import {fetchUserExperiencesOffset} from '../../../assets/js/lib/tap-client';

class ExperienceContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hasMore: true,
            offset: 0,
            limit: 6
        };
    }

    componentDidMount() {
        this.loadWall();
        this.mounted = true;
        this.wallUpdater = setInterval(() => {
            if (this.mounted) this.updateWall();
        }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.wallUpdater);
    }

    updateWall = () => {
        const {profile} = this.props;
        fetchUserExperiencesOffset(profile._id, 0, this.state.offset + this.state.limit, wall => {
            if (wall) this.setState({data: wall});
        });
    };

    loadWall = (advance, cb) => {
        const {profile} = this.props;
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
    };

    loadMore = cb => {
        this.loadWall(6, cb);
    };

    render() {
        const {profile, user} = this.props;
        const {data} = this.state;
        let experienceList = null;
        let timelineList = null;
        if (profile) {
            experienceList = data.map(experience => <ExperienceCard key={experience._id} experience={experience} />);

            timelineList = data.map(experience => <TimelineExperience key={experience._id} experience={experience} />);
        }

        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="timeline-map-holder">
                    <section className="timeline-section" style={{backgroundImage: `url(${timelineBorder})`}}>
                        {/* TODO */}
                        {timelineList}
                    </section>
                    <section className="map-section">
                        <div className="map-title-holder">
                            <img className="map-icon" src={map} alt="" />
                            <p>Places</p>
                        </div>
                        <img className="world-map" src={world} alt="" />
                    </section>
                </div>
                <section className="experiences-section">
                    <InfiniteScroll loadMore={this.loadMore} loadMoreOffset={300}>
                        {experienceList}
                    </InfiniteScroll>
                </section>
            </div>
        );
    }
}

export default ExperienceContent;
