"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controller/task-controller");
const taskRouter = express_1.default.Router();
taskRouter.post("/create", task_controller_1.createTask);
taskRouter.post("/edit/:id", task_controller_1.editTask);
taskRouter.post("/delete/:id", task_controller_1.deleteTask);
taskRouter.get("/", task_controller_1.taskList);
taskRouter.get("/task/:id", task_controller_1.getTask);
taskRouter.get("/create", task_controller_1.renderCreateTaskPage);
taskRouter.get("/edit/:id", task_controller_1.renderEditPage);
exports.default = taskRouter;
//# sourceMappingURL=tasks-route.js.map