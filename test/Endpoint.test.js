const nock = require('nock');
const Endpoint = require('../src/Endpoint');
const Errors = require('../src/Errors');

describe('Endpoint', () => {
  const endpoint = new Endpoint('access_token', 'https://api.base-api.io');

  describe('Making a request', () => {
    test('it returns a response', async () => {
      nock('https://api.base-api.io')
        .get('/v1/')
        .reply(200, 'BODY');

      const response = await endpoint.request('GET', '');

      expect(response.body.toString()).toEqual('BODY');
    });
  });

  describe('Handling 401', () => {
    test('throws an error', async () => {
      nock('https://api.base-api.io')
        .get('/v1/')
        .reply(401, '');

      try {
        await endpoint.request('GET', '');
        fail('This test failed!');
      } catch (error) {
        expect(error).toBeInstanceOf(Errors.Unauthorized);
      }
    });
  });

  describe('Handling 422', () => {
    test('throws an error', async () => {
      nock('https://api.base-api.io')
        .get('/v1/')
        .reply(422, '{"test":"TEST"}');

      try {
        await endpoint.request('GET', '');
        fail('This test failed!');
      } catch (error) {
        expect(error).toBeInstanceOf(Errors.InvalidRequest);
        expect(error.data).toEqual({ test: 'TEST' });
      }
    });
  });
});
