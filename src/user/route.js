import express from "express";
import createRoute from "./createRoute";
import forgotPassword from "./forgotPassword";
import getRoute from "./getRoute";
import login from "./login";
import loginByAdmin from "./loginByAdmin";
import searchRoute from "./searchRoute";
import update from "./update";
const verifyToken = require("../../middleware/verifyToken");

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/", createRoute);
userRoute.post("/loginByAdmin/:id", verifyToken, loginByAdmin);
userRoute.get("/:id", verifyToken, getRoute);
userRoute.get("/", verifyToken, getRoute);
userRoute.put("/", verifyToken, update);
userRoute.get("/users/search", verifyToken, searchRoute);
userRoute.post("/forgotPassword", forgotPassword);

export default userRoute;
