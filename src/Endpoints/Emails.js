const Check = require('check-types');

const Endpoint = require('../Endpoint');

class Emails extends Endpoint {
  list(page = 1, perPage = 10) {
    Check.assert.number(page);
    Check.assert.number(perPage);

    return this.requestJSON('GET', 'emails', {
      per_page: perPage,
      page,
    });
  }

  send(subject, from, to, html, text) {
    Check.assert.maybe.string(html);
    Check.assert.maybe.string(text);

    Check.assert.string(subject);
    Check.assert.string(from);
    Check.assert.string(to);

    return this.requestJSON('POST', 'emails', {
      subject,
      html,
      text,
      from,
      to,
    });
  }
}

module.exports = Emails;
