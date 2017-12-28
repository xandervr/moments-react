import React, {Component} from 'react';
import {Signin} from '../Signin';
import {Signup} from '../Signup';

class App extends Component {

  state = {}

  showSignup = () => {
    const $active = document.querySelector(`.signin`);
    const $inactive = document.querySelector(`.signup`);

    document.querySelector(`.signin-form`).classList.toggle(`slide-out`);
    document.querySelector(`.signup-form`).classList.toggle(`slide-in`);
    $active.classList.toggle(`active-signup`);
    $active.classList.toggle(`inactive`);
    $inactive.classList.toggle(`inactive`);
  }

  render() {

    const {} = this.state;

    return (
      <section>
        <div class="image-holder">
          <img src="/img/france.jpg" alt="" />
        </div>
        <div class="login-section">
          <div class="titles">
            <h1>Welcome to <span>MOMENTS</span></h1>
            <h2>Welcome back, please login to your account</h2>
          </div>
          <div class="form-holder">
            <div class="sign-titles">
              <h2 onclick="showSignup()" class="active signin pointer"><span>Sign in</span></h2>
              <h2 onclick="showSignup()" class="inactive signup pointer"><span>Sign up</span></h2>
            </div>
            <Signin />
            <SignUp />
          </div>
          <div class="terms">

          </div>
        </div>
      </section>
    );
  }
}

export default App;
