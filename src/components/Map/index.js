import React, { Component, Fragment } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import GoogleApiComponent from "google-maps-react/dist/GoogleApiComponent";
import spaceShuttle from "../../assets/svg/space-shuttle.svg";
import "./map.css";

class MapContainer extends Component {
    render() {
        const { experiences } = this.props;
        console.log(experiences);
        const markers = experiences.map(experience => {
            if (
                experience.media &&
                experience.media.metadata &&
                experience.media.metadata.gps_latitude
            ) {
                const position = {
                    lat: experience.media.metadata.gps_latitude,
                    lng: experience.media.metadata.gps_longitude
                };
                return (
                    <Marker
                        title={experience.title}
                        position={position}
                        icon={{ url: spaceShuttle }}
                    />
                );
            } else {
                return null;
            }
        });
        return (
            <Fragment>
                <Map
                    className="profile-map"
                    google={this.props.google}
                    initialCenter={{ lat: 50, lng: 4 }}
                    zoom={3}
                >
                    {markers}
                </Map>
            </Fragment>
        );
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyBC6n1__0F3_jE5V4K__WfcvcMKL9iJetI"
})(MapContainer);
