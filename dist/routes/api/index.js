"use strict";
const { Router } = require("express");
const usersRoute = require("./users").route;
const route = Router();
route.use("/users", usersRoute);
module.exports = { route };
