import React, { Component, Fragment } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import GoogleApiComponent from "google-maps-react/dist/GoogleApiComponent";
import spaceShuttle from "../../assets/svg/space-shuttle.svg";
import "./map.css";
import { InfoWindow } from "google-maps-react/dist/components/InfoWindow";

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    };

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
                        key={experience._id}
                        title={experience.title}
                        image={experience.media.image}
                        position={position}
                        icon={{ url: spaceShuttle }}
                        onClick={this.onMarkerClick}
                    />
                );
            } else {
                return null;
            }
        });
        console.log(this.state.selectedPlace);
        return (
            <Fragment>
                <Map
                    className="profile-map"
                    google={this.props.google}
                    initialCenter={{ lat: 50, lng: 4 }}
                    zoom={3}
                >
                    {markers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.title}</h1>
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src={this.state.selectedPlace.image}
                            />
                        </div>
                    </InfoWindow>
                </Map>
            </Fragment>
        );
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyBC6n1__0F3_jE5V4K__WfcvcMKL9iJetI"
})(MapContainer);
