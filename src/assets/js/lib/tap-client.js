/**
 * @author Xander Van Raemdonck
 * @email xander@tntap.be
 * @create date 2017-12-28 11:57:39
 * @modify date 2017-12-28 11:57:39
 * @desc [description]
 */

import {API_URL} from '../consts';

/**
 * @function comment Add a comment.
 * @param experience_id ID of experience to delete comment from.
 * @param comment_id Comment to delete.
 * @param cb Callback function returning boolean
 * @returns {boolean}
 * @public
 */

export const deleteComment = (experience_id, comment_id, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/experiences/${experience_id}/comments/${comment_id}`, {
            method: `DELETE`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function comment Add a comment.
 * @param experience_id ID of experience to comment on.
 * @param text Comment text.
 * @param cb Callback function returning boolean
 * @returns {boolean}
 * @public
 */

export const comment = (experience_id, text, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/experiences/${experience_id}/comments`, {
            method: `POST`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            },
            body: JSON.stringify({text: text})
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function search Search.
 * @param query Search query.
 * @param cb Callback function returning array of objects
 * @returns {[Object]}
 * @public
 */

export const search = (query, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/search/adv/${query}`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data);
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

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
        body: JSON.stringify({username: username, password: password})
    })
        .then(r => r.json())
        .then(data => {
            if (data.message === 'Success')
                authenticate(
                    data.token.client_id,
                    data.token.client_secret,
                    window.navigator.userAgent,
                    window.navigator.userAgent,
                    tokens => {
                        cb(tokens);
                    }
                );
            else cb(false);
        })
        .catch(err => console.log(err));
};

/**
 * @function register Register.
 * @param surname User's surname.
 * @param name User's name.
 * @param email User's email.
 * @param password User's password.
 * @param cb Callback function returning access object
 * @returns {Object}
 * @public
 */

export const register = (surname, name, email, password, cb) => {
    fetch(`${API_URL}/users`, {
        method: `POST`,
        headers: {
            'User-Agent': 'TapAuth Client/1.0',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({surname: surname, name: name, email: email, password: password})
    })
        .then(r => r.json())
        .then(data => {
            if (data.message === 'Success')
                authenticate(
                    data.client.client_id,
                    data.client.client_secret,
                    window.navigator.userAgent,
                    window.navigator.userAgent,
                    tokens => {
                        cb(tokens);
                    }
                );
            else cb(false);
        })
        .catch(err => console.log(err));
};

const fetchAccount = () => JSON.parse(localStorage.getItem('moments_account'));

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
        body: JSON.stringify({client_id: client_id, client_secret: client_secret})
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

/**
 * @function fetchWall Fetches the wall of a user.
 * @param cb Callback function returning wall object
 * @returns {Object}
 * @private
 */

export const fetchWall = cb => {
    let account = fetchAccount();
    if (account)
        fetch('http://moments.tntap.be/wall', {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.message === 'Success') cb(data.wall);
                else cb(false);
            })
            .catch(err => console.log(err));
    else {
        console.log('Authorization error');
        cb(false);
    }
};

/**
 * @function fetchUserByUsername Fetches the user by username.
 * @param username Username to fetch
 * @param cb Callback function returning user object
 * @returns {Object}
 * @private
 */

export const fetchUserByUsername = (username, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`http://moments.tntap.be/users/${username}`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.message === 'Success') cb(data.user);
                else cb(false);
            })
            .catch(err => console.log(err));
    else {
        console.log('Authorization error');
        cb(false);
    }
};

/**
 * @function boostExperience Boosts an experience.
 * @param experience_id Experience to boost.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const boostExperience = (experience_id, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/experiences/${experience_id}/boost`, {
            method: `PUT`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function unboostExperience Boosts an experience.
 * @param experience_id Experience to boost.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const unboostExperience = (experience_id, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/experiences/${experience_id}/unboost`, {
            method: `PUT`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function checkUsernameAvailable Check availability of a username.
 * @param username Username to check.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const checkUsernameAvailable = (username, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/users/available/${username}`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function saveUserSettings Save Settings of user account.
 * @param user User object to save settings from.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const saveUserSettings = (user, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/users/${user._id}`, {
            method: `PUT`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            },
            body: JSON.stringify({
                surname: user.surname,
                name: user.name,
                username: user.username,
                email: user.email,
                picture: user.picture,
                profile_type: user.settings.profile_type
            })
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function followUser Follows a user.
 * @param user_id User to follow.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const followUser = (user_id, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/users/${user_id}/follow`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function unfollowUser Unfollows a user.
 * @param user_id User to unfollow.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const unfollowUser = (user_id, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`${API_URL}/users/${user_id}/unfollow`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    else console.log('Authorization error');
};

/**
 * @function createExperience Create an experience.
 * @param experience_form Form that creates the experience.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const createExperience = (experience_form, cb) => {
    let account = fetchAccount();
    if (experience_form) {
        const formData = new FormData(experience_form);
        if (formData.get('description') === '') formData.delete('description');
        if (formData.get('location') === '') formData.delete('location');
        if (account)
            fetch(`${API_URL}/experiences`, {
                method: `POST`,
                headers: {
                    'User-Agent': 'TapAuth Client/1.0',
                    Authorization: `Bearer ${account.access_token}`
                },
                body: formData
            })
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    cb(data.message === 'Success');
                })
                .catch(err => console.log(err));
        else console.log('Authorization error');
    } else {
        console.log('No experience_form provided');
        cb(false);
    }
};
