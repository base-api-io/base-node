const Check = require("check-types");

const Endpoint = require("../Endpoint");

class Emails extends Endpoint {
  send(subject, from, to, html, text) {
    Check.assert.maybe.string(html);
    Check.assert.maybe.string(text);

    Check.assert.string(subject);
    Check.assert.string(from);
    Check.assert.string(to);

    return this.requestJSON("POST", "email", {
      subject: subject,
      html: html,
      text: text,
      from: from,
      to: to
    });
  }
}

module.exports = Emails;
