import React from "react";
import { Link } from "react-router-dom";
import Media from "../../../../components/Media";
import Location from "../../../../components/Location";

const ExperienceCard = ({ experience }) => {
    return (
        <Link to={`/e/${experience._id}`}>
            <div className="experience">
                <Media media={experience.media} />
                <div className="experience-overlay">
                    <p className="overlay-title">{experience.title}</p>
                    <div className="divide-titles" />
                    <Location
                        className="overlay-location"
                        experience={experience}
                    />
                </div>
            </div>
        </Link>
    );
};

export default ExperienceCard;
