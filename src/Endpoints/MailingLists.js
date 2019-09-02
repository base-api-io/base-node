const Check = require('check-types');

const Endpoint = require('../Endpoint');

class MailingLists extends Endpoint {
  list(page = 1, perPage = 10) {
    Check.assert.number(page);
    Check.assert.number(perPage);

    return this.requestJSON('GET', 'mailing_lists', {
      per_page: perPage,
      page,
    });
  }

  get(id) {
    Check.assert.string(id);

    return this.requestJSON('GET', `mailing_lists/${id}`);
  }

  subscribe(id, email) {
    Check.assert.maybe.string(email);
    Check.assert.maybe.string(id);

    return this.requestJSON('POST', `mailing_lists/${id}/subscribe`, {
      email,
    });
  }

  unsubscribe(id, email) {
    Check.assert.maybe.string(email);
    Check.assert.maybe.string(id);

    return this.requestJSON('POST', `mailing_lists/${id}/unsubscribe`, {
      email,
    });
  }

  unsubscribeUrl(id, email) {
    const token = Buffer.from(`${id}:${email}`).toString('base64');

    return `${this.url}/v1/mailing_lists/unsubscribe?token=${token}`;
  }

  send(id, subject, from, html, text) {
    Check.assert.maybe.string(html);
    Check.assert.maybe.string(text);
    Check.assert.maybe.string(id);

    Check.assert.string(subject);
    Check.assert.string(from);

    return this.requestJSON('POST', `mailing_lists/${id}/send`, {
      subject,
      html,
      text,
      from,
    });
  }
}

module.exports = MailingLists;
