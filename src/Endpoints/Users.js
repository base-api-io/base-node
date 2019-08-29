const Check = require('check-types');

const Endpoint = require('../Endpoint');

class Users extends Endpoint {
  list(page = 1, perPage = 10) {
    Check.assert.number(page);
    Check.assert.number(perPage);

    return this.requestJSON('GET', 'users', {
      per_page: perPage,
      page,
    });
  }

  create(email, password, confirmation, custom_data = null) {
    Check.assert.string(confirmation);
    Check.assert.string(password);
    Check.assert.string(email);

    return this.requestJSON('POST', 'users', {
      custom_data: JSON.stringify(custom_data),
      confirmation,
      password,
      email,
    });
  }

  update(id, email = null, custom_data = null) {
    Check.assert.maybe.string(email);
    Check.assert.string(id);

    return this.requestJSON('POST', `users/${id}`, {
      custom_data: JSON.stringify(custom_data),
      email,
    });
  }

  get(id) {
    Check.assert.string(id);

    return this.requestJSON('GET', `users/${id}`);
  }

  delete(id) {
    Check.assert.string(id);

    return this.requestJSON('DELETE', `users/${id}`);
  }
}

module.exports = Users;
