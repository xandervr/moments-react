import React, {Component} from "react";
import world from "../../../assets/svg/world.svg";
import map from "../../../assets/svg/map-localization.svg";
import TimelineExperience from "./TimelineExperience";
import ExperienceCard from "./ExperienceCard";

class ExperienceContent extends Component {
    render() {
        const {profile, user} = this.props;
        let experienceList = null;
        let timelineList = null;
        if (profile) {
            experienceList = profile
                .experiences
                .map(experience => (<ExperienceCard key={experience._id} experience={experience}/>));

            timelineList = profile
                .experiences
                .map(experience => (<TimelineExperience key={experience._id} experience={experience}/>));
        }

        return (
            <div
                style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {" "}
                <div className="timeline-map-holder">
                    <section className="timeline-section">
                        {/* TODO */}
                        {timelineList}
                    </section>
                    <section className="map-section">
                        <div className="map-title-holder">
                            <img className="map-icon" src={map} alt=""/>
                            <p>Places</p>
                        </div>
                        <img className="world-map" src={world} alt=""/>
                    </section>
                </div>{" "}
                <section className="experiences-section">
                    {" "}
                    {experienceList}{" "}
                </section>
            </div>
        );
    }
}

export default ExperienceContent;
