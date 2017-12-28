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

    authentication = {
        isAuthenticated: false,
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
                        data.message === 'Success'
                            ? (this.authentication.isAuthenticated = true)
                            : (this.authentication.isAuthenticated = false);
                        cb();
                    })
                    .catch(err => console.log(err));
            } else this.setState({fetched: true});
        }
    };

    componentWillMount() {
        this.authentication.checkLoggedIn(() => {
            this.setState({fetched: true});
        });
    }

    render() {
        if (this.state.fetched)
            return (
                <Router>
                    <div>
                        <LoginRoute
                            authenticated={this.authentication.isAuthenticated}
                            exact
                            path="/login"
                            component={SigninPage}
                        />
                        <AuthenticatedRoute
                            authenticated={this.authentication.isAuthenticated}
                            exact
                            path="/"
                            component={App}
                        />
                    </div>
                </Router>
            );
        else return null;
    }
}

const LoginRoute = ({component: Component, authenticated: authenticated, ...rest}) => {
    return <Route {...rest} render={() => (!authenticated ? <Component {...rest} /> : <Redirect to="/" />)} />;
};

const AuthenticatedRoute = ({component: Component, authenticated: authenticated, ...rest}) => {
    return <Route {...rest} render={() => (authenticated ? <Component {...rest} /> : <Redirect to="/login" />)} />;
};

export default Routing;
