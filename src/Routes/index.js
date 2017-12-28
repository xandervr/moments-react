import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from '../components/App';
import {API_URL} from '../assets/js/consts';
import SigninPage from '../components/SigninPage';

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log('checking');
        this.props.authentication.checkLoggedIn(() => {
            this.setState({fetched: true});
        });
    }

    render() {
        console.log('fetched: ' + this.state.fetched);
        if (this.state.fetched)
            return (
                <Router>
                    <div>
                        <LoginRoute
                            authentication={this.props.authentication}
                            exact
                            path="/login"
                            component={SigninPage}
                        />
                        <AuthenticatedRoute authentication={this.props.authentication} exact path="/" component={App} />
                    </div>
                </Router>
            );
        else return null;
    }
}

const LoginRoute = ({component: Component, authentication: authentication, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() =>
                !authentication.isAuthenticated ? (
                    <Component authentication={authentication} {...rest} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

const AuthenticatedRoute = ({component: Component, authentication: authentication, ...rest}) => {
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
