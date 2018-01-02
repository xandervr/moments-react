import React from 'react';
import france from '../../../assets/img/france.jpg';

const TimelineExperience = ({}) => {

  return (
    <div className="timeline-experience">
      <div>
        <p className="title">Paris</p>
        <p>4 Moments</p>
        <p>30 Boosts</p>
        <p>with 3 other people</p>
      </div>
      <img src={france} alt=""/>
    </div>
  );
};

export default TimelineExperience;
