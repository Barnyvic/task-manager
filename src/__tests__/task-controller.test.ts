import supertest from "supertest";
import app from "../app";
import testDb from "./database/database";

const api = supertest(app);

beforeAll(async () => {
  testDb.dbConnect();
});

afterAll(async () => {
  testDb.dbDisconnect();
  testDb.dbCleanUp();
});

describe("Task Manager", () => {
  it("should create a task", async () => {
    const response = await api
      .post("/api/tasks")
      .send({ title: "Test Task", description: "A test task" });
    expect(response.status).toBe(200);
  });
});
