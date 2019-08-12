class Unauthorized extends Error {}

class InvalidRequest extends Error {
  constructor(data) {
    super();
    this.data = data;
  }
}

class UnkownError extends Error {
  constructor(error) {
    super();
    this.error = error;
  }
}

module.exports = {
  InvalidRequest: InvalidRequest,
  Unauthorized: Unauthorized,
  UnkownError: UnkownError
};
