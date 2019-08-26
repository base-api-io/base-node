const nock = require('nock');
const Client = require('../../src/Client');


describe('Users Endpoint', () => {
  const client = new Client('access_token');

  const userData = {
    created_at: new Date(),
    email: 'test@user.com',
    id: 'id',
  };

  describe('Listing users', () => {
    test('returns a list of users', async () => {
      nock('https://api.base-api.io')
        .get('/v1/users?per_page=10&page=1')
        .reply(200, JSON.stringify({
          items: [userData],
          metadata: {
            count: 1,
          },
        }));

      const response = await client.users.list();

      expect(response.metadata.count).toEqual(1);
      expect(response.items.length).toEqual(1);
      expect(response.items[0]).toEqual(userData);
    });
  });

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
