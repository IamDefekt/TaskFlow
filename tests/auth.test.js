const request = require("supertest");
const { app } = require("../src/app");

describe("Auth API", () => {

  describe("POST /auth/register", () => {
      test("register user", async () => {
          const res = await request(app)
              .post("/auth/register")
              .send({ email: "ceciestuntest@test.com", password: "Azertyuiop1234" });

          expect(res.statusCode).toBe(201);
      });

  describe("POST /auth/login", () => {
      test("login user", async () => {
          const res = await request(app)
              .post("/auth/login")
              .send({ email: "ceciestuntest@test.com", password: "Azertyuiop1234" });

          expect(res.statusCode).toBe(200);
      });
    });
  });
});