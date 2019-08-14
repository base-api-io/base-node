const { Client } = require("../../src/Client");

const nock = require("nock");

describe("Sessions Endpoint", () => {
  const client = new Client("access_token");

  const userData = {
    created_at: new Date(),
    email: "test@user.com",
    id: "id"
  };

  describe("Authenticating a user", () => {
    test("it returns a user", async () => {
      nock("https://api.base-api.io")
        .post("/v1/sessions")
        .reply(200, JSON.stringify(userData));

      const user = await client.sessions.authenticate(
        "test@user.com",
        "123456"
      );

      expect(user).toEqual(userData);
    });
  });
});
