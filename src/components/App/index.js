import React, {Component} from "react";
import "./index.css";
import Navbar from "../Navbar";
import Wall from "../Wall";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        fetch("http://moments.tntap.be/experiences")
            .then(r => r.json())
            .then(result => {
                this.setState({data: result.experiences});
            })
            .catch(e => e);
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
