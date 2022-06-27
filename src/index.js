import express from "express";
import job from "./email/app";

const rootRoute = express.Router();

/* GET api root */
rootRoute.get("/", (req, res, next) => {
    const jobs = job;
    res.status(200).send("OK");
});

export default rootRoute;
