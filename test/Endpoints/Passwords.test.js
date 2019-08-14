const { Client } = require("../../src/Client");

const nock = require("nock");

describe("Passwords Endpoint", () => {
  const client = new Client("access_token");

  const userData = {
    created_at: new Date(),
    email: "test@user.com",
    id: "id"
  };

  const forgotPasswordData = {
    forgot_password_token: "123456"
  };

  describe("Setting a users passwords", () => {
    test("it returns a user", async () => {
      nock("https://api.base-api.io")
        .put("/v1/password")
        .reply(200, JSON.stringify(userData));

      const user = await client.passwords.setPassword(
        "forgot_password_token",
        "123456",
        "123456"
      );

      expect(user).toEqual(userData);
    });
  });

  describe("Getting a forgot password token", () => {
    test("it returns the token", async () => {
      nock("https://api.base-api.io")
        .post("/v1/password")
        .reply(200, JSON.stringify(forgotPasswordData));

      const user = await client.passwords.forgotPassword("email");

      expect(user).toEqual(forgotPasswordData);
    });
  });
});
