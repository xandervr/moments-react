import React, {Component} from 'react';
import {login} from '../../assets/js/lib/tap-client';
import {API_URL} from '../../assets/js/consts';
import Signin from '../Signin';
import Signup from '../Signup';
import france from '../../assets/svg/france.jpg';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

class SigninPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {username: '', password: ''},
            register: {surname: '', name: '', email: '', password: '', password_check: ''},
            account: {access_token: '', expire_date: '', refresh_token: ''}
        };
    }

    showSignup = () => {
        const $active = document.querySelector(`.signin`);
        const $inactive = document.querySelector(`.signup`);

        document.querySelector(`.signin-form`).classList.toggle(`slide-out`);
        document.querySelector(`.signup-form`).classList.toggle(`slide-in`);
        $active.classList.toggle(`active-signup`);
        $active.classList.toggle(`inactive`);
        $inactive.classList.toggle(`inactive`);
    };

    onChangeUsername = e => {
        const username = e.target.value;
        this.setState(prevState => ({
            login: {
                ...prevState.login,
                username: username
            }
        }));
    };

    onChangePassword = e => {
        const password = e.target.value;
        this.setState(prevState => ({
            login: {
                ...prevState.login,
                password: password
            }
        }));
    };

    onChangeRemember = e => {};

    performLogin = (e, cb) => {
        const {username, password} = this.state.login;

        if (username === ``) {
            document.querySelector(`.email-error`).classList.add(`show-error`);
        }
        if (password === ``) {
            document.querySelector(`.password-error`).classList.add(`show-error`)
        }

        if (username !== `` && password !== ``) {
            login(username, password, tokens => {
                  if (tokens) {
                  this.setState({
                                account: {
                                access_token: tokens.access_token,
                                expire_date: tokens.expire_date,
                                refresh_token: tokens.refresh_token
                                }
                                });
                  localStorage.setItem('moments_account', JSON.stringify(this.state.account));
                  cb(true);
                  } else {
                  cb(false);
                  }
                  });
        }

        e.preventDefault();
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
                            <h2 onClick={this.showSignup} className="active signin pointer">
                                <span>Sign in</span>
                            </h2>
                            <h2 onClick={this.showSignup} className="inactive signup pointer">
                                <span>Sign up</span>
                            </h2>
                        </div>
                        <Signin
                            authentication={this.props.authentication}
                            performLogin={this.performLogin}
                            onChangeRemember={this.onChangeRemember}
                            onChangeUsername={this.onChangeUsername}
                            onChangePassword={this.onChangePassword}
                            login={this.state.login}
                        />
                        <Signup />
                    </div>
                    <div className="terms" />
                </div>
            </section>
        );
    }
}

export default SigninPage;
