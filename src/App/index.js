import React, {Component, Fragment} from 'react';
import './index.css';
import Navbar from '../components/Navbar';
import Wall from '../components/Wall';
import Profile from '../Views/Profile';
import Settings from '../Views/Settings';
import {ExperienceCreate, ExperienceDetail} from '../Views/Experience';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    render() {
        const {path} = this.props;
        const {authentication} = this.props;
        const {user} = this.props.authentication;
        let show = null;
        switch (path) {
            case `/u/:username`:
                show = <Profile user={user} authentication={authentication} />;
                break;
            case `/create-experience`:
                show = <ExperienceCreate />;
                break;
            case `/e/:experience_id`:
                show = <ExperienceDetail user={user} authentication={authentication} />;
                break;
            case `/settings`:
                show = <Settings user={user} />;
                break;
            case `/`:
                show = <Wall user={user} />;
                break;
            default:
                show = (
                    <p
                        style={{
                            fontSize: '5rem'
                        }}
                    >
                        Page not Found
                    </p>
                );
        }
        return (
            <Fragment>
                <Navbar user={user} /> {show}
            </Fragment>
        );
    }
}

export default App;
