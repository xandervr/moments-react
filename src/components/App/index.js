import React, {Component} from "react";
import "./index.css";
import Navbar from "../Navbar";
import Wall from "../Wall";
import Profile from "../Profile";
import Settings from "../Settings";
import {ExperienceCreate, ExperienceDetail} from "../Experience";

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
                show = <Profile user={user} authentication={authentication}/>;
                break;
            case `/create-experience`:
                show = <ExperienceCreate/>;
                break;
            case `/e/:experience_id`:
                show = (<ExperienceDetail user={user} authentication={authentication}/>);
                break;
            case `/settings`:
                show = <Settings user={user}/>;
                break;
            case `/`:
                show = <Wall user={user}/>;
                break;
            default:
                show = <p style={{
                    fontSize: "5rem"
                }}>Page not Found</p>;
        }
        return (
            <div>
                <Navbar user={user}/> {show}
            </div>
        );
    }
}

export default App;
