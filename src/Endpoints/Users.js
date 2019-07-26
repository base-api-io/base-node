const Endpoint = require("../Endpoint");

class Users extends Endpoint {
  create(email, password, confirmation) {
    return this.requestJSON("POST", "users", {
      confirmation: confirmation,
      password: password,
      email: email
    });
  }

  get(id) {
    return this.requestJSON("GET", `users/${id}`);
  }

  delete(id) {
    return this.requestJSON("DELETE", `users/${id}`);
  }
}

module.exports = Users;
