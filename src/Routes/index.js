import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../components/App";
import SigninPage from "../components/SigninPage";

export default () => (
    <Router>
        <div>
            <Route exact path="/" component={SigninPage} />
            <AuthenticatedRoute exact path="/home" component={App} />
        </div>
    </Router>
);

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    <Route
        {...rest}
        render={props =>
            checkedLogedIn ? <Component {...props} /> : <Redirect to="/" />
        }
    />;
};
