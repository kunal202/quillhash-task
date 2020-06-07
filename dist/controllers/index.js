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
const models_1 = require("../models");
exports.blockuser = (targetuser, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield models_1.pool.query("UPDATE users SET blocked = true WHERE name = $1", [targetuser]);
    if (!response) {
        return res.status(401).send({
            message: "No User Found with that name",
        });
    }
    return response;
});
exports.likeduser = (targetuser) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield models_1.pool.query("UPDATE users SET liked = true WHERE name = $1", [targetuser]);
    if (response.rowCount === 0) {
        return null;
    }
    return response;
});
exports.viewuser = (targetuser, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield models_1.pool.query("SELECT * FROM users WHERE name = $1", [targetuser]);
    if (!response.rows[0]) {
        return null;
    }
    return response;
});
exports.createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, password, image } = req.body;
    const response = yield models_1.pool.query("INSERT INTO users (id, name, email, password, image) VALUES ($1, $2, $3, $4, $5)", [id, name, email, password, image]);
    return response;
});
exports.verfiyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const response = yield models_1.pool.query("SELECT * FROM users WHERE name = $1 AND email = $2 AND password = $3 ", [name, email, password]);
    if (!response.rows[0]) {
        return null;
    }
    return response;
});
exports.verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const beareheader = req.headers["authorization"];
    if (typeof beareheader !== undefined) {
        const bearertoken = (_a = beareheader) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        req.token = bearertoken;
    }
    else {
        return res.sendStatus(401);
    }
});
