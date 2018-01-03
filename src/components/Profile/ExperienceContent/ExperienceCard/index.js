import React from 'react';
import france from '../../../../assets/img/france.jpg';
import Media from '../../../Media';

const ExperienceCard = ({experience}) => {
    return (
        <div className="experience">
            <Media media={experience.media} />
            <div className="experience-overlay">
                <p className="overlay-title">{experience.title}</p>
                <div className="divide-titles" />
                <p className="overlay-location">
                    {experience.media.metadata &&
                    experience.media.metadata.gps_city &&
                    experience.media.metadata.gps_country
                        ? `${experience.media.metadata.gps_city} - ${experience.media.metadata.gps_country}`
                        : 'Les Orres - France'}
                </p>
            </div>
        </div>
    );
};

export default ExperienceCard;
