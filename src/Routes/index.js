import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../components/App";
import SigninPage from "../components/SigninPage";

export default () => (
    <Router>
        <div>
            <Route exact path="/" component={SigninPage} />
            <Route exact path="/home" component={App} />
        </div>
    </Router>
);
