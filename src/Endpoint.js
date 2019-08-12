const { Unauthorized, InvalidRequest, UnkownError } = require("./Errors");
const needle = require("needle");

const dateParser = function(key, value) {
  if (key === "created_at") {
    return new Date(Date.parse(value));
  } else {
    return value;
  }
};

class Endpoint {
  constructor(access_token, url) {
    this.accedd_token = access_token;
    this.url = url;
  }

  async requestJSON(method, path, data) {
    try {
      const response = await this.request(method, path, data);

      return JSON.parse(response.body, dateParser);
    } catch (error) {
      throw new UnkownError(error);
    }
  }

  async request(method, path, data) {
    let response;

    try {
      response = await needle(method, `${this.url}/v1/${path}`, data, {
        multipart: data && method !== "GET",
        headers: {
          Authorization: `Bearer ${this.access_token}`
        }
      });
    } catch (error) {
      throw new UnkownError(error);
    }

    if (response.statusCode === 401) {
      throw new Unauthorized();
    } else if (response.statusCode === 422) {
      throw new InvalidRequest(JSON.parse(response.body));
    } else {
      return response;
    }
  }
}

module.exports = Endpoint;
