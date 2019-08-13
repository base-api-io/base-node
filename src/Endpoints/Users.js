const Check = require("check-types");

const Endpoint = require("../Endpoint");

class Users extends Endpoint {
  create(email, password, confirmation) {
    Check.assert.string(confirmation);
    Check.assert.string(password);
    Check.assert.string(email);

    return this.requestJSON("POST", "users", {
      confirmation: confirmation,
      password: password,
      email: email
    });
  }

  get(id) {
    Check.assert.string(id);

    return this.requestJSON("GET", `users/${id}`);
  }

  delete(id) {
    Check.assert.string(id);

    return this.requestJSON("DELETE", `users/${id}`);
  }
}

module.exports = Users;
