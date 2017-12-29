import React, {Component} from 'react';
import './index.css';
import Navbar from '../Navbar';
import Wall from '../Wall';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    render() {
        const {user} = this.props.authentication;
        return (
            <div>
                <Navbar user={user} />
                <Wall user={user} />
            </div>
        );
    }
}

export default App;
