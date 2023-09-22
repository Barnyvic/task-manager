import mongoose, { Document, Model } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: String,
    description: String,
    completed: Boolean,
  },
  { timestamps: true }
);

export const Task: Model<ITask> = mongoose.model("Task", taskSchema);
