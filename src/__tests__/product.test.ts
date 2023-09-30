import supertest from "supertest";
import createServer from "../utils/server.utility";

const app = createServer();

describe("test", () => {
  describe("get test route", () => {
    describe("given user does not exixt", () => {
      it('should return 404 status code and message "User Not Found"', async () => {
        const userId = 3;
        await supertest(app).get(`/api/test-endpoint/${userId}`).expect(400);
      });
    });
  });
});
