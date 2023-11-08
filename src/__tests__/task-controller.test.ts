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
    const taskData = { title: "Test Task", description: "A test task" };

    const response = await api
      .post("/api/tasks")
      .send(taskData);

console.log(response.body);


    // expect(response.status).toBe(200);

    expect(response.body.title).toBe(taskData.title);
    expect(response.body.description).toBe(taskData.description);
    expect(response.body.completed).toBe(false);
  });
});
