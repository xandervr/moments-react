import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {API_URL} from './assets/js/consts';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

const authentication = {
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
                        ? (authentication.isAuthenticated = true)
                        : (authentication.isAuthenticated = false);
                    cb();
                })
                .catch(err => console.log(err));
        } else cb();
    }
};

ReactDOM.render(<Routes authentication={authentication} />, document.getElementById('root'));

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}
