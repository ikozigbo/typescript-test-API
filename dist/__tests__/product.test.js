"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_utility_1 = __importDefault(require("../utils/server.utility"));
const app = (0, server_utility_1.default)();
describe("test", () => {
    describe("get test route", () => {
        describe("given user does not exixt", () => {
            it('should return 404 status code and message "User Not Found"', async () => {
                const userId = 3;
                await (0, supertest_1.default)(app).get(`/api/test-endpoint/${userId}`).expect(400);
            });
        });
    });
});
