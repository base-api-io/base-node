const nock = require('nock');
const Client = require('../../src/Client');

describe('Mailing Lists Endpoint', () => {
  const client = new Client('access_token');

  const data = {
    falied: ['test2@user.com'],
    sent: ['test@user.com'],
  };

  const list = {
    unsubscribe_redirect_url: '',
    emails: ['test@user.com'],
    created_at: new Date(),
    name: 'test',
    id: 'id',
  };

  describe('Listing mailing lists', () => {
    test('returns a list of mailing lists', async () => {
      nock('https://api.base-api.io')
        .get('/v1/mailing_lists?per_page=10&page=1')
        .reply(
          200,
          JSON.stringify({
            items: [list],
            metadata: { count: 1 },
          }),
        );

      const response = await client.mailingLists.list();

      expect(response.metadata.count).toEqual(1);
      expect(response.items.length).toEqual(1);
      expect(response.items[0]).toEqual(list);
    });
  });

  describe('Getting mailing lists details', () => {
    test('returns mailing list details', async () => {
      nock('https://api.base-api.io')
        .get('/v1/mailing_lists/list_id')
        .reply(200, JSON.stringify(data));

      const item = await client.mailingLists.get('list_id');

      expect(item).toEqual(data);
    });
  });

  describe('Sending emails', () => {
    test('it sends emails to subscribers', async () => {
      nock('https://api.base-api.io')
        .post('/v1/mailing_lists/id/send')
        .reply(200, JSON.stringify(data));

      const results = await client.mailingLists.send(
        'id',
        'subject',
        'from@user.com',
        'html',
        'text',
      );

      expect(results).toEqual(data);
    });
  });

  describe('Subscribing to a mailing list', () => {
    test('it adds the email to subscribers', async () => {
      nock('https://api.base-api.io')
        .post('/v1/mailing_lists/id/subscribe')
        .reply(200, JSON.stringify(list));

      const results = await client.mailingLists.subscribe(
        'id',
        'from@user.com',
      );

      expect(results).toEqual(list);
    });
  });

  describe('Unubscribing from a mailing list', () => {
    test('it removes the email from subscribers', async () => {
      nock('https://api.base-api.io')
        .post('/v1/mailing_lists/id/unsubscribe')
        .reply(200, JSON.stringify(list));

      const results = await client.mailingLists.unsubscribe(
        'id',
        'from@user.com',
      );

      expect(results).toEqual(list);
    });
  });

  describe('Getting an unsubscribe url', () => {
    test('it returns an unsubscribe url', () => {
      const url = client.mailingLists.unsubscribeUrl('id', 'test@user.com');

      const token = Buffer.from('id:test@user.com').toString('base64');

      expect(url).toEqual(
        `https://api.base-api.io/v1/mailing_lists/unsubscribe?token=${token}`,
      );
    });
  });
});
