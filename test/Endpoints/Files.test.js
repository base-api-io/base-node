const { Client } = require("../../src/Client");

const nock = require("nock");

describe("files Endpoint", () => {
  const client = new Client("access_token");

  const data = {
    created_at: new Date(),
    id: "id"
  };

  describe("Creating a file", () => {
    test("it creates a file", async () => {
      nock("https://api.base-api.io")
        .post("/v1/files")
        .reply(200, JSON.stringify(data));

      const file = await client.files.create(
        { file: "test/fixtures/file", content_type: "text/plain" }
      );

      expect(file).toEqual(data);
    });
  });

  describe("Getting file details", () => {
    test("returns file details", async () => {
      nock("https://api.base-api.io")
        .get("/v1/files/file_id")
        .reply(200, JSON.stringify(data));

      const file = await client.files.get("file_id");

      expect(file).toEqual(data);
    });
  });

  describe("Deleting a file", () => {
    test("returns file details", async () => {
      nock("https://api.base-api.io")
        .delete("/v1/files/file_id")
        .reply(200, JSON.stringify(data));

      const file = await client.files.delete("file_id");

      expect(file).toEqual(data);
    });
  });

  describe("Getting the download url", () => {
    test("it returns the url", () => {
      const url = client.files.downloadUrl("file_id");

      expect(url).toEqual(
        "https://api.base-api.io/v1/files/file_id/download"
      );
    });
  })

  describe("Downloading the file", () => {
    test("it returns the file", async () => {
      nock("https://api.base-api.io")
        .get("/v1/files/file_id/download")
        .reply(200, "BLAH");

      const body = await client.files.download("file_id");

      expect(body.toString()).toEqual("BLAH");
    });
  })
});
