import express from "express";
import { createTask, deleteTask, editTask,  getTask, renderCreateTaskPage, renderEditPage, taskList } from "../controller/task-controller";

const taskRouter = express.Router();

taskRouter.post("/create", createTask);
taskRouter.post("/edit/:id", editTask);
taskRouter.post("/delete/:id", deleteTask);
taskRouter.get("/", taskList);
taskRouter.get("/task/:id", getTask);
taskRouter.get("/create", renderCreateTaskPage);
taskRouter.get("/edit/:id", renderEditPage);


export default taskRouter;
