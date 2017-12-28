import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Signin = ({
    onChangeUsername,
    onChangePassword,
    onChangeRemember,
    history,
    performLogin,
    login,
    authentication
}) => {
    return (
        <form className="signin-form" action="index.html" method="post">
            <div className="input-holder">
                <input id="email-signin" onChange={onChangeUsername} value={login.username} name="" required />
                <label className="input-label" htmlFor="email-signin">
                    Your email
                </label>
                <p className="error show-error">Your email is incorrect</p>
            </div>
            <div className="input-holder">
                <input
                    id="password-signin"
                    onChange={onChangePassword}
                    value={login.password}
                    type="password"
                    name=""
                    required
                />
                <label className="input-label" htmlFor="password-signin">
                    Password
                </label>
                <p className="error show-error">Your password is incorrect</p>
            </div>
            <div className="remember-holder">
                <input id="remember" type="checkbox" onChange={onChangeRemember} name="" value="" />
                <label htmlFor="remember">Remember me</label>
            </div>
            <div className="form-actions">
                <button
                    className="upper login-btn pointer"
                    type="button"
                    name="button"
                    onClick={() => {
                        console.log(history);
                        performLogin(window.event, auth => {
                            console.log(auth);
                            authentication.checkLoggedIn(() => {
                                if (auth) history.push('/');
                                console.log(history);
                            });
                        });
                    }}
                >
                    Sign in
                </button>
                {/* <button class="upper pointer signup-btn" type="button" name="button" onclick="showSignup()">Sign ip</button> */}
            </div>
        </form>
    );
};

export default withRouter(Signin);
