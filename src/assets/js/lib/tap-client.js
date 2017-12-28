/**
 * @author Xander Van Raemdonck
 * @email xander@tntap.be
 * @create date 2017-12-28 11:57:39
 * @modify date 2017-12-28 11:57:39
 * @desc [description]
 */

import {API_URL} from '../consts';

/**
 * @function login Login.
 * @param username User's username.
 * @param password User's password.
 * @param cb Callback function returning access object
 * @returns {Object}
 * @public
 */

export const login = (username, password, cb) => {
    fetch(`${API_URL}/users/login`, {
        method: `POST`,
        headers: {
            'User-Agent': 'TapAuth Client/1.0',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(r => r.json())
        .then(data => {
            authenticate(
                data.token.client_id,
                data.token.client_secret,
                window.navigator.userAgent,
                window.navigator.userAgent,
                tokens => {
                    cb(tokens);
                }
            );
        })
        .catch(err => console.log(err));
};

/**
 * @function authenticate Fetches an access_token object.
 * @param client_id Client ID provided in user object after login.
 * @param client_secret Client Secret provided in user object after login.
 * @param device_name (optional) Device name
 * @param device_os (optional) Device OS
 * @param cb Callback function returning access object
 * @returns {Object}
 * @private
 */

const authenticate = (client_id, client_secret, device_name, device_os, cb) => {
    fetch(`${API_URL}/token`, {
        method: `POST`,
        headers: {
            'User-Agent': 'TapAuth Client/1.0',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            client_id: client_id,
            client_secret: client_secret
        })
    })
        .then(r => r.json())
        .then(data => {
            fetch(`${API_URL}/authenticate`, {
                method: `POST`,
                headers: {
                    'User-Agent': 'TapAuth Client/1.0',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    client_id: client_id,
                    client_secret: client_secret,
                    code: data.code,
                    device_name: device_name,
                    device_os: device_os
                })
            })
                .then(r => r.json())
                .then(data => {
                    cb(data);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};
