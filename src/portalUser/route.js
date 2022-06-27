import express from "express";
const verifyToken = require("../../middleware/verifyToken");

const portalUserRoute = express.Router();

//Route
import getRoute from "./getRoute";
import createRoute from "./createRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
import deleteRoute from "./deleteRoute";
import getLinkRoute from "../../src/projectUser/getRoute.js";
import createLinkRoute from "../../src/projectUser/createRoute.js";
import updateLinkRoute from "../../src/projectUser/updateRoute.js";

portalUserRoute.get("/search/:id", verifyToken, searchRoute);
portalUserRoute.post("/link/:id", verifyToken, createLinkRoute);
portalUserRoute.get("/link/:id", verifyToken, getLinkRoute);
portalUserRoute.put("/link/:id", verifyToken, updateLinkRoute);
portalUserRoute.post("/", verifyToken, createRoute);
portalUserRoute.get("/:id", verifyToken, getRoute);
portalUserRoute.put("/:id", verifyToken, updateRoute);
portalUserRoute.delete("/:id", verifyToken, deleteRoute);

export default portalUserRoute;
