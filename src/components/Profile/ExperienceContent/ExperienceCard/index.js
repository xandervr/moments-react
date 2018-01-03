import React from 'react';
import france from '../../../../assets/img/france.jpg';
import Media from '../../../Media';
import Location from '../../../Location';

const ExperienceCard = ({experience}) => {
    return (
        <div className="experience">
            <Media media={experience.media} />
            <div className="experience-overlay">
                <p className="overlay-title">{experience.title}</p>
                <div className="divide-titles" />
                <Location className="overlay-location" experience={experience} />
            </div>
        </div>
    );
};

export default ExperienceCard;
