import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from '../App';
import {API_URL} from '../assets/js/consts';
import SigninPage from '../Views/SigninPage';

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.authentication.checkLoggedIn(() => {
            this.setState({fetched: true});
        });
    }

    componentDidMount() {
        setInterval(() => {
            this.authentication.checkLoggedIn(() => {
                //this.setState({fetched: true});
            });
        }, 5000);
    }

    authentication = {
        isAuthenticated: false,
        user: null,
        checkLoggedIn: cb => {
            let account = JSON.parse(localStorage.getItem('moments_account'));
            if (account) {
                fetch(`${API_URL}/validate`, {
                    methode: `GET`,
                    headers: {
                        Authorization: 'Bearer ' + account.access_token
                    }
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.message === 'Success') {
                            this.authentication.isAuthenticated = true;
                            this.authentication.user = data.user;
                        } else {
                            this.authentication.isAuthenticated = false;
                        }
                        cb();
                    })
                    .catch(err => console.log(err));
            } else cb();
        }
    };

    render() {
        if (this.state.fetched)
            return (
                <Router>
                    <Fragment>
                        <LoginRoute authentication={this.authentication} exact path="/login" component={SigninPage} />
                        <AuthenticatedRoute authentication={this.authentication} exact path="/" component={App} />
                        <AuthenticatedRoute
                            exact
                            path="/create-experience"
                            authentication={this.authentication}
                            component={App}
                        />
                        <AuthenticatedRoute path="/e/:experience_id" authentication={this.authentication} component={App} />
                        <AuthenticatedRoute path="/u/:username" authentication={this.authentication} component={App} />
                        <AuthenticatedRoute exact path="/settings" authentication={this.authentication} component={App} />
                    </Fragment>
                </Router>
            );
        else return null;
    }
}

const LoginRoute = ({component: Component, authentication, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() =>
                !authentication.isAuthenticated ? <Component authentication={authentication} {...rest} /> : <Redirect to="/" />
            }
        />
    );
};

export const AuthenticatedRoute = ({component: Component, authentication, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() =>
                authentication.isAuthenticated ? (
                    <Component authentication={authentication} {...rest} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default Routing;
