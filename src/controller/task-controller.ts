import { Request, Response } from "express";
import { Task } from "../model/task-model";
import logger from "../logger/logger";
import { sequelize } from "../model/postgress.model";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      logger.error("Title or description missing when creating task");
      return res.status(400).json({
        error: true,
        statusCode: 400,
        errorMessage: "title and description are required",
      });
    }

    const newTask = new Task({ title, description, completed: false });
    await newTask.save();

    const newTaskSequelize = await sequelize.models.Task.create({
      title,
      description,
      completed: false,
    });

    logger.info("New task created successfully");
    res.status(200).redirect("/");
  } catch (error) {
    logger.error("Error creating task", { error });
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};

export const renderCreateTaskPage = (req, res) => {
  logger.info("Rendering create task page");
  res.render("create");
};

export const renderEditPage = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
     logger.warn("Task not found while rendering edit page");
      return res.status(404).send("Task not found");
    }

     logger.info("Rendering edit page for task");
    res.render("edit", { task });
  } catch (error) {
    logger.error("error rendering edit page", { error });
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

     if (!task) {
       logger.warn("Task not found while editing task");
       return res.status(404).send("Task not found");
     }

    task.title = title;
    task.description = description;
    task.completed = completed === "true";

    await task.save();

    const taskSequelize = await sequelize.models.Task.findOne({
      where: { title: title },
    });
    if (!taskSequelize) {
      logger.error("Task not found");
      return res.status(404).send("Task not found");
    }

    taskSequelize.dataValues.title = title;
    taskSequelize.dataValues.description = description;
    taskSequelize.dataValues.completed = completed === "true";

    await taskSequelize.save();

    logger.info("Task edited successfully");
    res.redirect("/");
  } catch (error) {
    logger.error("Error editing task", { error });
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      logger.warn("Task id  required ");
      return res.status(404).send("Task id  required");
    }

    await Task.findByIdAndDelete(taskId);

     logger.info("Task deleted successfully");
    res.redirect("/");
  } catch (error) {
    logger.error("Error deleting task", { error });
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};

export const taskList = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });

    logger.info("Rendering task list page");
    res.render("index", { tasks });
  } catch (error) {
     logger.error("Error rendering task list page", { error });
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      logger.warn("Taskid  required ");
      return res.status(404).send("Task not found");
    }

    const task = await Task.findById(taskId);

    if (!task) {
      logger.warn("Task not found");
      return res.status(404).send("Task not found");
    }

     logger.info("Rendering task details page");
    res.render("task", { task });
  } catch (error) {
    logger.error("Error rendering task details page", { error });
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};
