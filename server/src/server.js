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
app.use(cors({credentials:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 8000;
const ip = '0.0.0.0'



app.listen(port,ip, () => {
  console.log("Backend Nodejs is running on the port : " + port);
});
