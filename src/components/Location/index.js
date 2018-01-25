import React, {Component} from 'react';
import './index.css';

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {experience, className} = this.props;
        if (experience && experience.media.metadata && experience.media.metadata.address) {
            const {gps_city, gps_country} = experience.media.metadata.address;
            if (gps_city && gps_country) return <p className={`location ${className}`}>{`${gps_city} - ${gps_country}`}</p>;
            else if (gps_country) return <p className={`location ${className}`}>{`${gps_country}`}</p>;
            else return null;
        } else return null;
    }
}

export default Location;
