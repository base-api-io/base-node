const nock = require('nock');
const Client = require('../../src/Client');

describe('Emails Endpoint', () => {
  const client = new Client('access_token');

  const data = {
    created_at: new Date(),
    from: 'test@user.com',
  };

  describe('Listing emails', () => {
    test('returns a list of emails', async () => {
      nock('https://api.base-api.io')
        .get('/v1/emails?per_page=10&page=1')
        .reply(
          200,
          JSON.stringify({
            items: [data],
            metadata: { count: 1 },
          }),
        );

      const response = await client.emails.list();

      expect(response.metadata.count).toEqual(1);
      expect(response.items.length).toEqual(1);
      expect(response.items[0]).toEqual(data);
    });
  });

  describe('Sending an email', () => {
    test('it sends an email', async () => {
      nock('https://api.base-api.io')
        .post('/v1/emails')
        .reply(200, JSON.stringify(data));

      const email = await client.emails.send(
        'subject',
        'from@user.com',
        'to@user.com',
        'reply-to@user.com',
        'html',
        'text',
      );

      expect(email).toEqual(data);
    });
  });
});
