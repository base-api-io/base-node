const Check = require('check-types');

const Endpoint = require('../Endpoint');

class Forms extends Endpoint {
  list(page = 1, perPage = 10) {
    Check.assert.number(page);
    Check.assert.number(perPage);

    return this.requestJSON('GET', 'forms', {
      per_page: perPage,
      page,
    });
  }

  create(name) {
    Check.assert.string(name);

    return this.requestJSON('POST', 'forms', {
      name,
    });
  }

  get(id) {
    Check.assert.string(id);

    return this.requestJSON('GET', `forms/${id}`);
  }

  delete(id) {
    Check.assert.string(id);

    return this.requestJSON('DELETE', `forms/${id}`);
  }

  submit(id, data) {
    Check.assert.string(id);

    return this.requestJSON('POST', `forms/${id}/submit`, data);
  }

  submissions(id, page = 1, perPage = 10) {
    Check.assert.string(id);
    Check.assert.number(page);
    Check.assert.number(perPage);

    return this.requestJSON('GET', `forms/${id}/submissions`, {
      per_page: perPage,
      page,
    });
  }

  getSubmission(id, submissionId) {
    Check.assert.string(submissionId);
    Check.assert.string(id);

    return this.requestJSON('GET', `forms/${id}/submissions/${submissionId}`);
  }

  deleteSubmission(id, submissionId) {
    Check.assert.string(submissionId);
    Check.assert.string(id);

    return this.requestJSON('DELETE', `forms/${id}/submissions/${submissionId}`);
  }
}

module.exports = Forms;
