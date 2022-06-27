import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import multiparty from "connect-multiparty";
import rootRoute from "./src";

//Routes
import userRoute from "./src/user/route";
import portalRoute from "./src/portal/route";
import bookRoute from "./src/books/route";
import userBookRoute from "./src/userBook/route";
import sendEmailRoute from "./src/sendEmail";

dotenv.config();

// initialize app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb" }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

// middleware for handling multipart/form-data
app.use(multiparty());

// cors support
app.use(cors());

// add compression
app.use(compression());

// logs
app.use(logger("dev"));

// cookie support
app.use(cookieParser());

// apply routes
app.use("/", rootRoute);

//Routes
app.use(`/v1/sendEmail`, sendEmailRoute);
export default app;
