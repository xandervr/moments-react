import React from 'react';
import france from '../../../../assets/img/france.jpg';
import Media from '../../../../components/Media';
import {formatDate} from '../../../../assets/js/lib/helpers';

const TimelineExperience = ({experience}) => {
    return (
        <div className="timeline-experience">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <p className="title">Paris</p>
                    <p>
                        {experience.moments.length}
                        {experience.moments.length === 1 ? ' Moment' : ' Moments'}
                    </p>
                    <p>
                        {experience.boosters.length}
                        {experience.boosters.length === 1 ? ' Boost' : ' Boosts'}
                    </p>
                    <p>with 3 other people</p>
                </div>
                <Media media={experience.media} />
            </div>
            <p className="time">{formatDate(experience.created_on)}</p>
        </div>
    );
};

export default TimelineExperience;
