import mongoose from "mongoose";
import dotenv from "dotenv";
import { Client } from "pg";
dotenv.config();


 const dataBaseConnection =async () => {
   const url = process.env.MONGODB_URL;

   try {
     await mongoose.connect(url)
     console.log("MONGODB CONNECTED...")
   } catch (error) {
    console.error(error.message);
    process.exit(1);
   }
 }

 export {dataBaseConnection}