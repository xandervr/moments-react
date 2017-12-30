import React, {Component} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import App from "../components/App";
import {API_URL} from "../assets/js/consts";
import SigninPage from "../components/SigninPage";

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this
            .authentication
            .checkLoggedIn(() => {
                this.setState({fetched: true});
            });
    }

    componentDidMount() {
        setInterval(() => {
            this
                .authentication
                .checkLoggedIn(() => {
                    this.setState({fetched: true});
                });
        }, 5000);
    }

    authentication = {
        isAuthenticated: false,
        user: null,
        checkLoggedIn: cb => {
            let account = JSON.parse(localStorage.getItem("moments_account"));
            if (account) {
                fetch(`${API_URL}/validate`, {
                        methode: `GET`,
                        headers: {
                            Authorization: "Bearer " + account.access_token
                        }
                    })
                    .then(r => r.json())
                    .then(data => {
                        if (data.message === "Success") {
                            this.authentication.isAuthenticated = true;
                            this.authentication.user = data.user;
                        } else {
                            this.authentication.isAuthenticated = false;
                        }
                        cb();
                    })
                    .catch(err => console.log(err));
            } else 
                cb();
            }
        };

    render() {
        if (this.state.fetched) 
            return (
                <Router>
                    <div>
                        <LoginRoute
                            authentication={this.authentication}
                            exact
                            path="/login"
                            component={SigninPage}/>
                        <AuthenticatedRoute
                            authentication={this.authentication}
                            exact
                            path="/"
                            component={App}/>
                        <AuthenticatedRoute
                            exact
                            path="/u/:username"
                            authentication={this.authentication}
                            component={App}
                        />
                        <AuthenticatedRoute
                            exact
                            path="/settings"
                            authentication={this.authentication}
                            component={App}
                        />
                    </div>
                </Router>
            );
        else 
            return null;
        }
    }

const LoginRoute = ({
    component: Component,
    authentication,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={() => !authentication.isAuthenticated
            ? (<Component authentication={authentication} {...rest}/>)
            : (<Redirect to="/"/>)}/>
    );
};

const AuthenticatedRoute = ({
    component: Component,
    authentication,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={() => authentication.isAuthenticated
            ? (<Component authentication={authentication} {...rest}/>)
            : (<Redirect to="/login"/>)}/>
    );
};

export default Routing;
