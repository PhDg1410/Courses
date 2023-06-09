import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch';

require("dotenv").config();
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;



app.listen(port, () => {
  console.log("Backend Nodejs is running on the port : " + port);
});
