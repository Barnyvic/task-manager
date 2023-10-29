import { Request, Response } from "express";
import { Task } from "../model/task-model";
import { sequelize } from "../model/postgress.model";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
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

    res.redirect("/");
  } catch (error) {
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
  res.render("create");
};

export const renderEditPage = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.render("edit", { task });
  } catch (error) {
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
      return res.status(404).send("Task not found");
    }

     taskSequelize.dataValues.title = title;
     taskSequelize.dataValues.description = description;
     taskSequelize.dataValues.completed = completed === "true";

     await taskSequelize.save();

    res.redirect("/");
  } catch (error) {
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
    await Task.findByIdAndDelete(taskId);
    res.redirect("/");
  } catch (error) {
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
    res.render("index", { tasks });
  } catch (error) {
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
    const task = await Task.findById(taskId);
    res.render("task", { task });
  } catch (error) {
    return res.status(error?.status || error?.statusCode || 500).json({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
};
