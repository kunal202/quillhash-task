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
const express_1 = require("express");
require("dotenv").config();
const router = express_1.Router();
const jwt = require("jsonwebtoken");
const io = require("socket.io")(4000);
// io.on('connection', (socket: { emit: () => void; }) =>{
//     socket.emit()
// })
// const socket = io('http://localhost:3000')
// socket.on('liked messgae ')
const index_1 = require("../controllers/index");
// ###################################
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status(201).send("Incomplete Info");
    }
    const user = yield index_1.verfiyUser(req, res);
    if (user !== null) {
        const token = jwt.sign({
            email: req.body.email,
            name: req.body.name,
        }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Auth Successful",
            token: token,
        });
    }
    return res.status(401).json({
        message: "Unauthorized User",
    });
}));
// // ###################################
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id ||
        !req.body.email ||
        !req.body.name ||
        !req.body.password ||
        !req.body.image) {
        return res.status(201).send("Incomplete Info");
    }
    const user = yield index_1.createUser(req);
    res.status(200).json({
        message: "User Stored Successfully",
    });
}));
// // ###################################
// router.post("/block/:name", async (req, res) => {
//   const blockeduser = blockuser(req.params.name, res);
//   if (!blockeduser) {
//     return res.status(401).json({
//       message: "unable to find user",
//     });
//   }
//   return res.status(200).json({
//     message: "Blocked Succesfully",
//   });
// });
// // ###################################
router.post("/like/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield index_1.likeduser(req.params.name);
    if (like === null) {
        return res.status(401).json({
            message: "unable to find user",
        });
    }
    io.on('Connection', (socket) => {
        socket.on("message", (m) => {
            console.log("this is message");
            io.emit("message", m);
        });
    });
    return res.status(200).json({
        message: "Liked Succesfully",
    });
}));
exports.default = router;
