import React, {Component} from "react";
import "./index.css";
import Navbar from "../Navbar";
import Profile from "../Profile";
import Wall from "../Wall";
import {fetchWall} from "../../assets/js/lib/tap-client";
import {setInterval} from "timers";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        fetchWall().then(result => {
            this.setState({data: result.experiences});
        }).catch(e => e);

        setInterval(() => {
            fetchWall().then(result => {
                this.setState({data: result.experiences});
            }).catch(e => e);
        }, 5000);
    }

    render() {
        const {path} = this.props;
        const {user} = this.props.authentication;
        const experiences = this.state.data
            ? this.state.data
            : [];
        let show = null;
        switch (path) {
          case `/profile`:
            show = <Profile user={user}/>
            break;
          case `/`:
            show = <Wall experiences={experiences} user={user} />
            break;
          default:
        }
        return (
            <div>
                <Navbar user={user}/>
                {show}
            </div>
        );
    }
}

export default App;
