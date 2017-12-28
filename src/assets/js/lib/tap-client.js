/**
 * @author Xander Van Raemdonck
 * @email xander@tntap.be
 * @create date 2017-12-28 11:57:39
 * @modify date 2017-12-28 11:57:39
 * @desc [description]
 */

const API = `http://moments.tntap.be`;

/**
 * @function authenticate Fetches an access_token object.
 * @param client_id Client ID provided in user object after login.
 * @param client_secret Client Secret provided in user object after login.
 * @param device_name (optional) Device name
 * @param device_os (optional) Device OS
 * @param cb Callback function returning access object
 * @returns {Object}
 * @public
 */

const authenticate = (client_id, client_secret, device_name, device_os, cb) => {
    fetch(`${API}/token`, {
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
            fetch(`${API}/authenticate`, {
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