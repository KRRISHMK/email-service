import express from "express";
const verifyToken = require("../../middleware/verifyToken");

const bookRoute = express.Router();

//Route
import getRoute from "./getRoute";
import createRoute from "./createRoute";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";
import deleteRoute from "./deleteRoute";
import publicSearch from "./publicSearch";

bookRoute.get("/search", verifyToken, searchRoute);
bookRoute.post("/", verifyToken, createRoute);
bookRoute.get("/:id", verifyToken, getRoute);
bookRoute.get("/public/books", publicSearch);
bookRoute.put("/:id", verifyToken, updateRoute);
bookRoute.delete("/:id", verifyToken, deleteRoute);

export default bookRoute;
