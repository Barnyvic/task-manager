import express, { Application, Request, Response } from "express";
import path from "path"
import taskRouter from "./routes/tasks-route";

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", taskRouter)


app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "route not found" });
});

export default app;
