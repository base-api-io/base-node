const { Client } = require("../../src/Client");

const nock = require("nock");

describe("Users Endpoint", () => {
  const client = new Client("access_token");

  const data = {
    created_at: new Date(),
    from: "test@user.com"
  };

  describe("Sending an email", () => {
    test("it sends an email", async () => {
      nock("https://api.base-api.io")
        .post("/v1/email")
        .reply(200, JSON.stringify(data));

      const email = await client.emails.send(
        "subject",
        "from@user.com",
        "to@user.com",
        "html",
        "text"
      );

      expect(email).toEqual(data);
    });
  });
});
