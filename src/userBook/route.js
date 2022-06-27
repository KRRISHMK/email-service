import express from "express";
const verifyToken = require("../../middleware/verifyToken");

const userBookRoute = express.Router();

//Route
import createRoute from "./createRoute";
import deleteRoute from "./deleteRoute";
import publicSearch from "../books/publicSearch";
import searchRoute from "./searchRoute";
import updateRoute from "./updateRoute";

userBookRoute.get("/search", verifyToken, searchRoute);
userBookRoute.post("/", verifyToken, createRoute);
userBookRoute.put("/:id", verifyToken, updateRoute);
userBookRoute.delete("/:id", verifyToken, deleteRoute);

export default userBookRoute;
