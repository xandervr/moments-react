import React from 'react';

const Signin = ({}) => {

  return (
    <form class="signin-form" action="index.html" method="post">
      <div class="input-holder">
        <input id="email-signin" name="" required />
        <label class="input-label" for="email-signin">Your email</label>
      </div>
      <div class="input-holder">
        <input id="password-signin" type="password" name="" required />
        <label class="input-label" for="password-signin">Password</label>
      </div>
      <div class="remember-holder">
        <input id="remember" type="checkbox" name="" value="" />
        <label for="remember">Remember me</label>
      </div>
      <div class="form-actions">
        <button class="upper login-btn pointer" type="button" name="button">Sign in</button>
        {/* <button class="upper pointer signup-btn" type="button" name="button" onclick="showSignup()">Sign ip</button> */}
      </div>
    </form>
  )
};

export default Signin;
