const nock = require('nock');
const Client = require('../../src/Client');

describe('forms Endpoint', () => {
  const client = new Client('access_token');

  const data = {
    created_at: new Date(),
    name: 'Test',
    id: 'id',
  };

  const submissionData = {
    created_at: new Date(),
    fields: {},
    files: [],
    id: 'id',
  };

  describe('Listing forms', () => {
    test('returns a list of forms', async () => {
      nock('https://api.base-api.io')
        .get('/v1/forms?per_page=10&page=1')
        .reply(200, JSON.stringify({
          items: [data],
          metadata: { count: 1 },
        }));

      const response = await client.forms.list();

      expect(response.metadata.count).toEqual(1);
      expect(response.items.length).toEqual(1);
      expect(response.items[0]).toEqual(data);
    });
  });

  describe('Creating a form', () => {
    test('it creates a form', async () => {
      nock('https://api.base-api.io')
        .post('/v1/forms')
        .reply(200, JSON.stringify(data));

      const form = await client.forms.create('Test');

      expect(form).toEqual(data);
    });
  });

  describe('Getting a form', () => {
    test('returns the form', async () => {
      nock('https://api.base-api.io')
        .get('/v1/forms/form_id')
        .reply(200, JSON.stringify(data));

      const form = await client.forms.get('form_id');

      expect(form).toEqual(data);
    });
  });

  describe('Deleting a form', () => {
    test('deletes and returns the form', async () => {
      nock('https://api.base-api.io')
        .delete('/v1/forms/form_id')
        .reply(200, JSON.stringify(data));

      const form = await client.forms.delete('form_id');

      expect(form).toEqual(data);
    });
  });

  describe('Submitting a form', () => {
    test('it creates a form submission', async () => {
      nock('https://api.base-api.io')
        .post('/v1/forms/id/submit')
        .reply(200, JSON.stringify(submissionData));

      const submission = await client.forms.submit('id', { key: 'value' });

      expect(submission).toEqual(submissionData);
    });
  });

  describe('Listing form submissions', () => {
    test('returns a list of form submissions', async () => {
      nock('https://api.base-api.io')
        .get('/v1/forms/id/submissions?per_page=10&page=1')
        .reply(200, JSON.stringify({
          items: [submissionData],
          metadata: { count: 1 },
        }));

      const response = await client.forms.submissions('id');

      expect(response.metadata.count).toEqual(1);
      expect(response.items.length).toEqual(1);
      expect(response.items[0]).toEqual(submissionData);
    });
  });

  describe('Getting a form submission', () => {
    test('returns the form submission', async () => {
      nock('https://api.base-api.io')
        .get('/v1/forms/form_id/submissions/id')
        .reply(200, JSON.stringify(submissionData));

      const form = await client.forms.getSubmission('form_id', 'id');

      expect(form).toEqual(submissionData);
    });
  });

  describe('Delete a form submission', () => {
    test('returns the form submission', async () => {
      nock('https://api.base-api.io')
        .delete('/v1/forms/form_id/submissions/id')
        .reply(200, JSON.stringify(submissionData));

      const form = await client.forms.deleteSubmission('form_id', 'id');

      expect(form).toEqual(submissionData);
    });
  });
});
