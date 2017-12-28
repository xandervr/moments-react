import React from 'react';

const Signup = ({}) => {

  return (
    <form class="signup-form" action="index.html" method="post">
        <div class="double-input-holder">
          <div class="input-holder double-input">
            <input id="firstname-signup" name="" required />
            <label class="input-label" for="firstname-signup">First name</label>
          </div>
          <div class="input-holder double-input">
            <input id="lastname-signup" name="" required />
            <label class="input-label" for="lastname-signup">Last name</label>
          </div>
        </div>
        <div class="input-holder">
          <input id="email-signup" name="" required />
          <label class="input-label" for="email-signup">Your email</label>
        </div>
        <div class="input-holder">
          <input id="password-signup" type="password" name="" required />
          <label class="input-label" for="password-signup">Password</label>
        </div>
        <div class="form-actions">
          <button class="upper pointer signup-btn" type="button" name="button">create account</button>
        </div>
    </form>
  );
};

export default Signup;
