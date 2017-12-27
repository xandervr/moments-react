import React, { Component } from "react";
import "./index.css";
import Navbar from '../Navbar';
import Wall from '../Wall';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Wall/>
            </div>

        );
    }
}

export default App;
