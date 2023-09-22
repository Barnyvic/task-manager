import app from "./app";
import dotenv from "dotenv";
import { dataBaseConnection } from "./database/config";
dotenv.config()

const port = process.env.PORT || 3000;


app.listen(port, async() => {
  await dataBaseConnection()
  return console.log(`Express is listening at http://localhost:${port}`);
});
