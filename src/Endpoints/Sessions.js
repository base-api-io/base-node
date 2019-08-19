const Check = require('check-types');

const Endpoint = require('../Endpoint');

class Sessions extends Endpoint {
  authenticate(email, password) {
    Check.assert.string(password);
    Check.assert.string(email);

    return this.requestJSON('POST', 'sessions', {
      password,
      email,
    });
  }
}

module.exports = Sessions;
