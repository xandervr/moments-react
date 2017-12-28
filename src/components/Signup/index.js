import React from "react";

const Signup = props => {
    return (
        <form className="signup-form" action="index.html" method="post">
            <div className="double-input-holder">
                <div className="input-holder double-input">
                    <input id="firstname-signup" name="" required />
                    <label className="input-label" htmlFor="firstname-signup">
                        First name
                    </label>
                </div>
                <div className="input-holder double-input">
                    <input id="lastname-signup" name="" required />
                    <label className="input-label" htmlFor="lastname-signup">
                        Last name
                    </label>
                </div>
            </div>
            <div className="input-holder">
                <input id="email-signup" name="" required />
                <label className="input-label" htmlFor="email-signup">
                    Your email
                </label>
            </div>
            <div className="input-holder">
                <input id="password-signup" type="password" name="" required />
                <label className="input-label" htmlFor="password-signup">
                    Password
                </label>
            </div>
            <div className="input-holder">
                <input id="confirm-password-signup" type="password" name="" required />
                <label className="input-label" htmlFor="confirm-password-signup">
                    Confirm Password
                </label>
            </div>
            <div className="form-actions">
                <button
                    className="upper pointer signup-btn"
                    type="button"
                    name="button">
                    create account
                </button>
            </div>
        </form>
    );
};

export default Signup;
