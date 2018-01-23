import React from 'react';
import {withRouter} from 'react-router-dom';

const Signup = ({
    authentication,
    performRegister,
    onChangeSurname,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onChangePasswordCheck,
    history,
    register
}) => {
    const isValid = () => {
        return register.surname === `` ||
            register.name === `` ||
            register.email === `` ||
            register.password === `` ||
            register.password !== register.password_check
            ? true
            : false;
    };

    return (
        <form
            className="signup-form"
            action="index.html"
            method="post"
            onSubmit={e => {
                performRegister(e, auth => {
                    authentication.checkLoggedIn(() => {
                        if (auth) history.push('/');
                    });
                });
                e.preventDefault();
            }}
        >
            <div className="double-input-holder">
                <div className="input-holder double-input">
                    <input id="firstname-signup" value={register.surname} onChange={onChangeSurname} name="" required />
                    <label className="input-label" htmlFor="firstname-signup">
                        First name
                    </label>
                    {/* <p className="error show-error">Please enter a name</p> */}
                </div>
                <div className="input-holder double-input">
                    <input id="lastname-signup" value={register.name} onChange={onChangeName} name="" required />
                    <label className="input-label" htmlFor="lastname-signup">
                        Last name
                    </label>
                </div>
            </div>
            <div className="input-holder">
                <input id="email-signup" value={register.email} onChange={onChangeEmail} name="" required />
                <label className="input-label" htmlFor="email-signup">
                    Your email
                </label>
                {/* <p className="error show-error">Please enter a correct email</p> */}
            </div>
            <div className="input-holder">
                <input
                    id="password-signup"
                    value={register.password}
                    onChange={onChangePassword}
                    type="password"
                    name=""
                    required
                />
                <label className="input-label" htmlFor="password-signup">
                    Password
                </label>
                {/* <p className="error show-error">Please enter a password</p> */}
            </div>
            <div className="input-holder">
                <input
                    id="confirm-password-signup"
                    value={register.password_check}
                    onChange={onChangePasswordCheck}
                    type="password"
                    name=""
                    required
                />
                <label className="input-label" htmlFor="confirm-password-signup">
                    Confirm Password
                </label>
                {/* <p className="error show-error">Your passwords do not match</p> */}
            </div>
            <div className="form-actions">
                <button className="upper pointer signup-btn" disabled={isValid()} type="submit" name="button">
                    create account
                </button>
            </div>
        </form>
    );
};

export default withRouter(Signup);
