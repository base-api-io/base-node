const Passwords = require("./Endpoints/Passwords");
const Sessions = require("./Endpoints/Sessions");
const Emails = require("./Endpoints/Emails");
const Images = require("./Endpoints/Images");
const Users = require("./Endpoints/Users");
const Files = require("./Endpoints/Files");
const Errors = require("./Errors");

class Client {
  constructor(access_token, url = "https://api.base-api.io") {
    this.passwords = new Passwords(access_token, url);
    this.sessions = new Sessions(access_token, url);
    this.emails = new Emails(access_token, url);
    this.images = new Images(access_token, url);
    this.users = new Users(access_token, url);
    this.files = new Files(access_token, url);
  }
}

module.exports = {
  Client: Client,
  ...Errors
};
