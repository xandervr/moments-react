import React, { Component, Fragment } from "react";
import { GoogleApiWrapper, Map } from "google-maps-react";
import GoogleApiComponent from "google-maps-react/dist/GoogleApiComponent";

class MapContainer extends Component {
    render() {
        return (
            <Fragment>
                <Map
                    style={{
                        width: "90%",
                        height: "20rem"
                    }}
                    google={this.props.google}
                    zoom={14}
                />
            </Fragment>
        );
    }
}

export default GoogleApiComponent({
    apiKey: "AIzaSyBC6n1__0F3_jE5V4K__WfcvcMKL9iJetI"
})(MapContainer);
