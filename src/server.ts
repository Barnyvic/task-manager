import app from "./app";
import dotenv from "dotenv";
import { dataBaseConnection } from "./database/config";
import logger from "./logger/logger";
dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  try {
    await dataBaseConnection();
    logger.info(`Database connected successfully`);

    logger.info(`Express is listening at http://localhost:${port}`);
  } catch (error) {
    logger.error(`Server error: ${error.message}`);
    process.exit(1);
  }
});
