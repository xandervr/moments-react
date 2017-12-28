import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import App from '../components/App';
import {API_URL} from '../assets/js/consts';
import SigninPage from '../components/SigninPage';

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
    }

    componentWillMount() {
        this.checkLoggedIn(() => {
            this.setState({fetched: true});
            console.log('fetch done');
        });
    }

    checkLoggedIn = cb => {
        let account = JSON.parse(localStorage.getItem('moments_account'));
        fetch(`${API_URL}/validate`, {
            methode: `GET`,
            headers: {
                Authorization: 'Bearer ' + account.access_token
            }
        })
            .then(r => r.json())
            .then(data => {
                data.message === 'Success'
                    ? this.setState({authenticated: true})
                    : this.setState({authenticated: false});
                cb();
            })
            .catch(err => console.log(err));
    };

    render() {
        if (this.state.fetched) {
            console.log(this.state);
            return (
                <Router>
                    <div>
                        <LoginRoute
                            authenticated={this.state.authenticated}
                            exact
                            path="/login"
                            component={SigninPage}
                        />
                        <AuthenticatedRoute authenticated={this.state.authenticated} exact path="/" component={App} />
                    </div>
                </Router>
            );
        } else return null;
    }
}

const LoginRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={() => (!rest.authenticated ? <Component {...rest} /> : <Redirect to="/" />)} />;
};

const AuthenticatedRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={() => (rest.authenticated ? <Component {...rest} /> : <Redirect to="/login" />)} />;
};

export default Routing;
