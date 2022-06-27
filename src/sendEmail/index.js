import express from "express";
import createRoute from "./createRoute";
import Send from "./Send";

const sendEmailRoute = express.Router();

sendEmailRoute.post("/", Send);

export default sendEmailRoute;
