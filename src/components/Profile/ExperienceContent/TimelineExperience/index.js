import React from 'react';
import france from '../../../../assets/img/france.jpg';
import Media from '../../../Media';

const TimelineExperience = ({experience}) => {
    return (
        <div className="timeline-experience">
            <div>
                <p className="time">{experience.created_on}</p>
                <p className="title">Paris</p>
                <p>4 Moments</p>
                <p>30 Boosts</p>
                <p>with 3 other people</p>
            </div>
            <Media media={experience.media} />
        </div>
    );
};

export default TimelineExperience;
