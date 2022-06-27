const config = require("../config");
import models from "../db/models";
module.exports = (req, res, next) => {
    const token = req.header("authorization") || req.query.token;
    // Validate if token is null
    if (!token) {
        return res
            .status(401)
            .send({ message: "Missing authorization header" });
    }

    if (token) {
        // Validate token is not equal to default API key
        if (token !== config.defaultApiKey) {
            return res.status(401).send({ message: "Invalid Token" });
        }
        return next();
    }
};
