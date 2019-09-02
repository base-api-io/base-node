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
