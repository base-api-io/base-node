const Check = require('check-types');

const Endpoint = require('../Endpoint');

class Passwords extends Endpoint {
  forgotPassword(email) {
    Check.assert.string(email);

    return this.requestJSON('POST', 'password', {
      email,
    });
  }

  setPassword(forgotPasswordToken, confirmation, password) {
    Check.assert.string(forgotPasswordToken);
    Check.assert.string(confirmation);
    Check.assert.string(password);

    return this.requestJSON('PUT', 'password', {
      forgot_password_token: forgotPasswordToken,
      confirmation,
      password,
    });
  }
}

module.exports = Passwords;
