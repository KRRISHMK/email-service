import express from "express";
const verifyToken = require("../../middleware/verifyToken");

const portalRoute = express.Router();

//Route
import getRoute from "./getRoute";
import createRoute from "./createRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
import deleteRoute from "./deleteRoute";

portalRoute.get("/search", searchRoute);
portalRoute.post("/", verifyToken, createRoute);
portalRoute.get("/:id", verifyToken, getRoute);
portalRoute.put("/:id", verifyToken, updateRoute);
portalRoute.delete("/:id", verifyToken, deleteRoute);

export default portalRoute;
