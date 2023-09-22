"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.taskList = exports.deleteTask = exports.editTask = exports.renderEditPage = exports.renderCreateTaskPage = exports.createTask = void 0;
const task_model_1 = require("../model/task-model");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                error: true,
                statusCode: 400,
                errorMessage: "title and description are required",
            });
        }
        const newTask = new task_model_1.Task({ title, description, completed: false });
        yield newTask.save();
        res.redirect("/");
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
            error: true,
            statusCode: (error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.errorMessage) || `Internal Server Error`,
            trace: error,
        });
    }
});
exports.createTask = createTask;
const renderCreateTaskPage = (req, res) => {
    res.render("create");
};
exports.renderCreateTaskPage = renderCreateTaskPage;
const renderEditPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.render("edit", { task });
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
            error: true,
            statusCode: (error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.errorMessage) || `Internal Server Error`,
            trace: error,
        });
    }
});
exports.renderEditPage = renderEditPage;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed } = req.body;
        const taskId = req.params.id;
        const task = yield task_model_1.Task.findById(taskId);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        task.title = title;
        task.description = description;
        task.completed = completed === "true";
        yield task.save();
        res.redirect("/");
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
            error: true,
            statusCode: (error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.errorMessage) || `Internal Server Error`,
            trace: error,
        });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        yield task_model_1.Task.findByIdAndDelete(taskId);
        res.redirect("/");
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
            error: true,
            statusCode: (error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.errorMessage) || `Internal Server Error`,
            trace: error,
        });
    }
});
exports.deleteTask = deleteTask;
const taskList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.Task.find({}).sort({ createdAt: -1 });
        res.render("index", { tasks });
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
            error: true,
            statusCode: (error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.errorMessage) || `Internal Server Error`,
            trace: error,
        });
    }
});
exports.taskList = taskList;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield task_model_1.Task.findById(taskId);
        res.render("task", { task });
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
            error: true,
            statusCode: (error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.errorMessage) || `Internal Server Error`,
            trace: error,
        });
    }
});
exports.getTask = getTask;
//# sourceMappingURL=task-controller.js.map