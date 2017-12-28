import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {API_URL} from './assets/js/consts';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));

registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}
