import express, { Application, Request, Response } from "express";
import path from "path";
import taskRouter from "./routes/tasks-route";
import logger from "./logger/logger";

const app: Application = express();

app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.url} accessed`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", taskRouter);

app.use("*", (req: Request, res: Response) => {
  logger.warn("Route not found");
  return res.status(404).json({ message: "route not found" });
});

export default app;
