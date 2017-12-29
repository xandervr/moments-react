import React, {Component} from "react";
import "./index.css";
import Navbar from "../Navbar";
import Profile from "../Profile";
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
