import React, { Component } from "react";
import Signin from "../Signin";
import Signup from "../Signup";
import france from "../../assets/svg/france.jpg";
import "./index.css";

class SigninPage extends Component {
    constructor(props) {
        super(props);
        this.state({});
    }

    onChangeLogin = e => {
        this.setState({
            login: {}
        });
    };
    showSignup = () => {
        const $active = document.querySelector(`.signin`);
        const $inactive = document.querySelector(`.signup`);

        document.querySelector(`.signin-form`).classList.toggle(`slide-out`);
        document.querySelector(`.signup-form`).classList.toggle(`slide-in`);
        $active.classList.toggle(`active-signup`);
        $active.classList.toggle(`inactive`);
        $inactive.classList.toggle(`inactive`);
    };

    render() {
        const {} = this.state;

        return (
            <section>
                <div className="image-holder">
                    <img src={france} alt="france" />
                </div>
                <div className="login-section">
                    <div className="titles">
                        <h1>
                            Welcome to <span>MOMENTS</span>
                        </h1>
                        <h2>Welcome back, please login to your account</h2>
                    </div>
                    <div className="form-holder">
                        <div className="sign-titles">
                            <h2
                                onClick={this.showSignup}
                                className="active signin pointer"
                            >
                                <span>Sign in</span>
                            </h2>
                            <h2
                                onClick={this.showSignup}
                                className="inactive signup pointer"
                            >
                                <span>Sign up</span>
                            </h2>
                        </div>
                        <Signin />
                        <Signup />
                    </div>
                    <div className="terms" />
                </div>
            </section>
        );
    }
}

export default SigninPage;
