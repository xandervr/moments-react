import React, {Component} from 'react';
import './index.css';
import Navbar from '../Navbar';
import Wall from '../Wall';
import Profile from '../Profile';
import Settings from '../Settings';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    render() {
        const {path} = this.props;
        const {user} = this.props.authentication;
        let show = null;
        switch (path) {
            case `/profile`:
                show = <Profile user={user} />;
                break;
            case `/settings`:
                show = <Settings user={user} />;
                break;
            case `/`:
                show = <Wall user={user} />;
                break;
            default:
        }
        return (
            <div>
                <Navbar user={user} />
                {show}
            </div>
        );
    }
}

export default App;
