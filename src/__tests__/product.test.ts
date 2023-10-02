import supertest from "supertest";
import createServer from "../utils/server.utility";

const app = createServer();

describe("products", () => {
  describe("get test route", () => {
    describe("given user does not exixt", () => {
      beforeAll(async () => {
        // Sync only the specific test model
        ///jwt
      });
      it('should return 400 status code and message "User Not Found"', async () => {
        const userId = 3;
        const response = await supertest(app)
          .get(`/api/test-endpoint/${userId}`)
          .set(
            "Authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTYjh5NjE1OTE5NSwiZXhwIjoxNjk2MjQ1NTk1fQ.uGm-e3_v-wAHhTrlsqVpkCM1DJtCfx9WP8vp3BR2zE`
          );
        expect(response.status).toBe(200);
      });
    });
  });
});
