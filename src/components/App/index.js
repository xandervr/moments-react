import React, {Component} from "react";
import "./index.css";
import Navbar from "../Navbar";
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
        const experiences = this.state.data
            ? this.state.data
            : [];
        const {user} = this.props.authentication;
        return (
            <div>
                <Navbar user={user}/>
                <Wall experiences={experiences} user={user}/>
            </div>
        );
    }
}

export default App;
