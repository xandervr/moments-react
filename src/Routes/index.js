import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../components/App";
import Navbar from "../components/Navbar";

export default () => (
    <Router>
        <div>
            <Route exact path="/" component={Navbar} />
            <Route exact path="/home" component={App} />
        </div>
    </Router>
);
