const needle = require('needle');
const { Unauthorized, InvalidRequest, UnkownError } = require('./Errors');

function dateParser(key, value) {
  if (key === 'created_at') {
    return new Date(Date.parse(value));
  }
  return value;
}

class Endpoint {
  constructor(accessToken, url) {
    this.accessToken = accessToken;
    this.url = url;
  }

  async requestJSON(method, path, data) {
    const response = await this.request(method, path, data);

    try {
      return JSON.parse(response.raw.toString(), dateParser);
    } catch (error) {
      throw new UnkownError(error);
    }
  }

  async request(method, path, data) {
    let response;

    try {
      response = await needle(method, `${this.url}/v1/${path}`, data, {
        multipart: data && method !== 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      throw new UnkownError(error);
    }

    if (response.statusCode === 401) {
      throw new Unauthorized();
    } else if (response.statusCode === 422) {
      throw new InvalidRequest(JSON.parse(response.raw.toString()));
    } else {
      return response;
    }
  }
}

module.exports = Endpoint;
