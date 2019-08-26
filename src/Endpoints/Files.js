const Check = require('check-types');
const Needle = require('needle');

const Endpoint = require('../Endpoint');

class Files extends Endpoint {
  list(page = 1, perPage = 10) {
    Check.assert.number(page);
    Check.assert.number(perPage);

    return this.requestJSON('GET', 'files', {
      per_page: perPage,
      page,
    });
  }

  create(file) {
    Check.assert.maybe.like(file, {
      file: '/path/to/file',
      content_type: 'text/plain',
    });

    return this.requestJSON('POST', 'files', {
      file,
    });
  }

  downloadUrl(id) {
    return `${this.url}/v1/files/${id}/download`;
  }

  async download(id) {
    Check.assert.string(id);

    const url = this.downloadUrl(id);
    const response = await Needle('GET', url);

    return response.body;
  }

  get(id) {
    Check.assert.string(id);

    return this.requestJSON('GET', `files/${id}`);
  }

  delete(id) {
    Check.assert.string(id);

    return this.requestJSON('DELETE', `files/${id}`);
  }
}

module.exports = Files;
