"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createUser } = require("../../controllers/users");
const { Users } = require("../../models").models;
const Sequelize = require("sequelize");
//POST /api/users
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let u = req.body.user;
    const user = yield createUser(u.email, u.name, u.surname);
    yield user.save();
    res.send(user);
}));
//GET /api/users
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email = "", name = "", surname = "" } = req.query;
    const whereClause = {
        email: { [Sequelize.Op.iLike]: `%${email}%` },
        name: { [Sequelize.Op.iLike]: `%${name}%` },
        surname: { [Sequelize.Op.iLike]: `%${surname}%` },
    };
    const users = yield Users.findAll({
        where: whereClause,
    });
    if (!users) {
        return res.status(404).send({
            errors: {
                body: ["No Users Found"],
            },
        });
    }
    res.send(users);
}));
module.exports = {
    route,
};
