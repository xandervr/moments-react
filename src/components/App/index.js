import React, {Component} from "react";
import "./index.css";
import Navbar from "../Navbar";
import Wall from "../Wall";
import Profile from "../Profile";
import Settings from "../Settings";

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
            case "/u/:username/experiences":
                show = <Profile user={user} content={"experiences"}/>;
                break;
            case `/u/:username`:
                show = <Profile user={user}/>;
                break;
            case `/settings`:
                show = <Settings user={user}/>;
                break;
            case `/`:
                show = <Wall user={user}/>;
                break;
            default:
                show = (
                    <p style={{
                        fontSize: "5rem"
                    }}>
                        Page not Found
                    </p>
                );
        }
        return (
            <div>
                <Navbar user={user}/> {show}
            </div>
        );
    }
}

export default App;
