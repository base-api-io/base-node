const nock = require('nock');
const Client = require('../../src/Client');


describe('Users Endpoint', () => {
  const client = new Client('access_token');

  const userData = {
    created_at: new Date(),
    email: 'test@user.com',
    id: 'id',
  };

  describe('Creating a user', () => {
    test('it creates a user', async () => {
      nock('https://api.base-api.io')
        .post('/v1/users')
        .reply(200, JSON.stringify(userData));

      const user = await client.users.create(
        'test@user.com',
        '123456',
        '123456',
      );

      expect(user).toEqual(userData);
    });
  });

  describe('Getting user details', () => {
    test('returns user details', async () => {
      nock('https://api.base-api.io')
        .get('/v1/users/user_id')
        .reply(200, JSON.stringify(userData));

      const user = await client.users.get('user_id');

      expect(user).toEqual(userData);
    });
  });

  describe('Deleting a user', () => {
    test('returns user details', async () => {
      nock('https://api.base-api.io')
        .delete('/v1/users/user_id')
        .reply(200, JSON.stringify(userData));

      const user = await client.users.delete('user_id');

      expect(user).toEqual(userData);
    });
  });
});
