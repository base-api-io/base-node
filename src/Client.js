const Users = require("./Endpoints/Users");
const Errors = require("./Errors");

class Client {
  constructor(access_token, url = "https://api.base-api.io") {
    this.users = new Users(access_token, url);
  }
}

module.exports = {
  Client: Client,
  ...Errors
};
