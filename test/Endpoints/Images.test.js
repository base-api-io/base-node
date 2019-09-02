const nock = require('nock');
const Client = require('../../src/Client');

describe('Images Endpoint', () => {
  const client = new Client('access_token');

  const imageData = {
    image: 'image',
  };

  describe('Listing images', () => {
    test('returns a list of images', async () => {
      nock('https://api.base-api.io')
        .get('/v1/images?per_page=10&page=1')
        .reply(
          200,
          JSON.stringify({
            items: [imageData],
            metadata: {
              count: 1,
            },
          }),
        );

      const response = await client.images.list();

      expect(response.metadata.count).toEqual(1);
      expect(response.items.length).toEqual(1);
      expect(response.items[0]).toEqual(imageData);
    });
  });

  describe('Creating a image', () => {
    test('it creates a image', async () => {
      nock('https://api.base-api.io')
        .post('/v1/images')
        .reply(200, JSON.stringify(imageData));

      const image = await client.images.create({
        file: 'test/fixtures/file',
        content_type: 'text/plain',
      });

      expect(image).toEqual(imageData);
    });
  });

  describe('Downloading the image', () => {
    test('it returns the image', async () => {
      nock('https://api.base-api.io')
        .get('/v1/images/image_id/version?')
        .reply(200, 'IO');

      const io = await client.images.download('image_id');
      expect(io).toBeInstanceOf(Buffer);
    });
  });

  describe('Getting the image url', () => {
    test('it returns the url without any params', () => {
      const url = client.images.imageUrl('image_id');

      expect(url).toEqual(
        'https://api.base-api.io/v1/images/image_id/version?',
      );
    });

    test('it returns the url with quality', () => {
      const url = client.images.imageUrl('image_id', 80);

      expect(url).toEqual(
        'https://api.base-api.io/v1/images/image_id/version?quality=80',
      );
    });

    test('it returns the url with format', () => {
      const url = client.images.imageUrl('image_id', null, 'png');

      expect(url).toEqual(
        'https://api.base-api.io/v1/images/image_id/version?format=png',
      );
    });

    test('it returns the url with resize', () => {
      const url = client.images.imageUrl('image_id', null, null, {
        width: 10,
        height: 8,
      });

      expect(url).toEqual(
        'https://api.base-api.io/v1/images/image_id/version?resize=10_8',
      );
    });

    test('it returns the url with crop', () => {
      const url = client.images.imageUrl('image_id', null, null, null, {
        top: 1,
        left: 2,
        width: 3,
        height: 4,
      });

      expect(url).toEqual(
        'https://api.base-api.io/v1/images/image_id/version?crop=3_4_2_1',
      );
    });
  });

  describe('Getting image details', () => {
    test('returns image details', async () => {
      nock('https://api.base-api.io')
        .get('/v1/images/image_id')
        .reply(200, JSON.stringify(imageData));

      const image = await client.images.get('image_id');

      expect(image).toEqual(imageData);
    });
  });

  describe('Deleting a image', () => {
    test('returns image details', async () => {
      nock('https://api.base-api.io')
        .delete('/v1/images/image_id')
        .reply(200, JSON.stringify(imageData));

      const image = await client.images.delete('image_id');

      expect(image).toEqual(imageData);
    });
  });
});
