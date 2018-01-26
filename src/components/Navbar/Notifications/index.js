import React, {Component} from 'react';
import './index.css';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="notifications-holder">
                <div>notification</div>
                <div>notification</div>
            </div>
        );
    }
}

export default Notifications;
