import React from 'react';
import france from '../../../assets/img/france.jpg';

const Experience = ({}) => {

  return (
    <div className="experience">
      <img src={france} alt=""/>
      <div className="experience-overlay">
        <p className="overlay-title">Paris</p>
        <div className="divide-titles"></div>
        <p className="overlay-location">Paris - france</p>
      </div>
    </div>
  );
};

export default Experience;
