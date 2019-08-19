const Passwords = require('./Endpoints/Passwords');
const Sessions = require('./Endpoints/Sessions');
const Emails = require('./Endpoints/Emails');
const Images = require('./Endpoints/Images');
const Users = require('./Endpoints/Users');
const Files = require('./Endpoints/Files');

class Client {
  constructor(accessToken, url = 'https://api.base-api.io') {
    this.passwords = new Passwords(accessToken, url);
    this.sessions = new Sessions(accessToken, url);
    this.emails = new Emails(accessToken, url);
    this.images = new Images(accessToken, url);
    this.users = new Users(accessToken, url);
    this.files = new Files(accessToken, url);
  }
}

module.exports = Client;
