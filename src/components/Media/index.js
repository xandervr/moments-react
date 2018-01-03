import React, {Component} from 'react';
import './index.css';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {media} = this.props;
        if (media.image) {
            if (media.metadata) {
                switch (media.metadata.orientation) {
                    case 6:
                        return <img src={media.image} className="rotated" alt={media.name} />;
                        break;
                    default:
                        return <img src={media.image} alt={media.name} />;
                        break;
                }
            } else return <img src={media.image} alt={media.name} />;
        } else if (media.video) {
            return (
                <video width="320" height="240" controls>
                    <source src={media.video} type={media.mime} />
                    Your browser does not support the video tag.
                </video>
            );
        } else return null;
    }
}

export default Media;
