/**
 * @author Xander Van Raemdonck
 * @email xander@tntap.be
 * @create date 2017-12-28 11:57:39
 * @modify date 2017-12-28 11:57:39
 * @desc [description]
 */

import {API_URL} from '../consts';

/**
 * @function deleteComment Delete a comment.
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
            body: JSON.stringify({
                text: text
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
        body: JSON.stringify({
            username: username,
            password: password
        })
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
        body: JSON.stringify({
            surname: surname,
            name: name,
            email: email,
            password: password
        })
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
 * @function fetchWallOffset Fetches the wall of a user.
 * @param offset Offset to start.
 * @param limit Limit to end.
 * @param cb Callback function returning wall object
 * @returns {Object}
 * @private
 */

export const fetchWallOffset = (offset, limit, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`http://moments.tntap.be/wall/${offset}/${limit}`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.message === 'Success' && data.wall.length > 0) cb(data.wall);
                else cb(false);
            })
            .catch(err => console.log(err));
    else {
        console.log('Authorization error');
        cb(false);
    }
};

/**
 * @function fetchUserExperiencesOffset Fetches the wall of a user.
 * @param user_id User to fetch wall from.
 * @param offset Offset to start.
 * @param limit Limit to end.
 * @param cb Callback function returning wall object
 * @returns {[Object]}
 * @private
 */

export const fetchUserExperiencesOffset = (user_id, offset, limit, cb) => {
    let account = fetchAccount();
    if (account)
        fetch(`http://moments.tntap.be/users/${user_id}/experiences/${offset}/${limit}`, {
            method: `GET`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${account.access_token}`
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.message === 'Success' && data.experiences.length > 0) cb(data.experiences);
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

export const saveUserSettings = (user, form, cb) => {
    let account = fetchAccount();
    if (account) {
        const formData = new FormData(form);
        if (formData.get('media').size === 0) formData.delete('media');
        formData.set('surname', user.surname);
        formData.set('name', user.name);
        formData.set('username', user.username);
        formData.set('email', user.email);
        formData.set('profile_type', user.settings.profile_type);
        if (user.crop) formData.set('crop', JSON.stringify(user.crop));
        fetch(`${API_URL}/users/${user._id}`, {
            method: `PUT`,
            headers: {
                'User-Agent': 'TapAuth Client/1.0',
                Authorization: `Bearer ${account.access_token}`
            },
            body: formData
        })
            .then(r => r.json())
            .then(data => {
                cb(data.message === 'Success');
            })
            .catch(err => console.log(err));
    } else console.log('Authorization error');
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
                    cb(data.message === 'Success');
                })
                .catch(err => console.log(err));
        else console.log('Authorization error');
    } else {
        console.log('No experience_form provided');
        cb(false);
    }
};

/**
 * @function getExperienceById Fetch an experience.
 * @param experience_id Experience ID.
 * @param cb Callback function returning an experience object.
 * @returns {Object}
 * @private
 */

export const fetchExperienceById = (experience_id, cb) => {
    let account = fetchAccount();
    if (experience_id) {
        if (account)
            fetch(`${API_URL}/experiences/${experience_id}`, {
                method: `GET`,
                headers: {
                    'User-Agent': 'TapAuth Client/1.0',
                    Authorization: `Bearer ${account.access_token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    cb(data.message === 'Success' ? data.experience : false);
                })
                .catch(err => console.log(err));
        else console.log('Authorization error');
    } else {
        console.log('No experience_id provided');
        cb(false);
    }
};

/**
 * @function preparseImage Preparse media.
 * @param file File of media to preparse.
 * @param cb Callback function returning a boolean
 * @returns {uri}
 * @private
 */

export const preparseImage = (file, cb) => {
    let account = fetchAccount();
    if (file) {
        const formData = new FormData();
        formData.append('media', file);
        if (account)
            fetch(`${API_URL}/preparser`, {
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
                    if (data.message === 'Success') cb(data);
                    else cb(false);
                })
                .catch(err => {
                    console.log(err);
                    cb(false);
                });
        else console.log('Authorization error');
    } else {
        console.log('No experience_form provided');
        cb(false);
    }
};

/**
 * @function addMoment Add a moment to an experience.
 * @param experience_id Experience id to add moment to.
 * @param moment Moment object to add {title, desc, file}.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const addMoment = (experience_id, moment, cb) => {
    let account = fetchAccount();
    if (experience_id && moment && moment.file && moment.title) {
        const formData = new FormData();
        formData.append('title', moment.title);
        if (moment.desc) formData.append('description', moment.desc);
        formData.append('media', moment.file);
        if (account)
            fetch(`${API_URL}/experiences/${experience_id}/moments`, {
                method: `POST`,
                headers: {
                    'User-Agent': 'TapAuth Client/1.0',
                    Authorization: `Bearer ${account.access_token}`
                },
                body: formData
            })
                .then(r => r.json())
                .then(data => {
                    data.message === 'Success' ? cb(data) : cb(false);
                })
                .catch(err => console.log(err));
        else console.log('Authorization error');
    } else {
        console.log('No experience_id or moment provided');
        cb(false);
    }
};

/**
 * @function deleteMoment Delete a moment of an experience.
 * @param moment_id Moment id to remove.
 * @param cb Callback function returning a boolean
 * @returns {boolean}
 * @private
 */

export const deleteMoment = (moment_id, cb) => {
    let account = fetchAccount();
    if (moment_id) {
        if (account)
            fetch(`${API_URL}/experiences/moments/${moment_id}`, {
                method: `DELETE`,
                headers: {
                    'User-Agent': 'TapAuth Client/1.0',
                    Authorization: `Bearer ${account.access_token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    cb(data.message === 'Success');
                })
                .catch(err => console.log(err));
        else console.log('Authorization error');
    } else {
        console.log('No moment_id provided');
        cb(false);
    }
};

/**
 * @function fetchNotifications Fetch a user's notifications.
 * @param offset Offset to show.
 * @param limit Number of notifications to show.
 * @param cb Callback function returning an experience object.
 * @returns {Object}
 * @private
 */

export const fetchNotifications = (offset, limit, cb) => {
    let account = fetchAccount();
    if (offset >= 0 && limit >= 0) {
        if (account)
            fetch(`${API_URL}/notifications/${offset}/${limit}`, {
                method: `GET`,
                headers: {
                    'User-Agent': 'TapAuth Client/1.0',
                    Authorization: `Bearer ${account.access_token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    if (data.message === 'Success') cb(data.notifications);
                    else cb(false);
                })
                .catch(err => {
                    console.log(err);
                    cb(false);
                });
        else {
            console.log('Authorization error');
            cb(false);
        }
    } else {
        console.log('No offset or limit provided.');
        cb(false);
    }
};
