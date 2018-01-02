import React from "react";
import france from "../../../../assets/img/france.jpg";

const ExperienceCard = ({experience}) => {
  return (
    <div className="experience">
      <img src={experience.media.image} alt=""/>
      <div className="experience-overlay">
        <p className="overlay-title">{experience.title}</p>
        <div className="divide-titles"/>
        <p className="overlay-location">Paris - france</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
