"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
// const route = require('./routes/api/index')
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use("/api", route);
// app.get("/", (req : Request, res: Response) => {
// //   res.send("The sedulous hyena ate the antelope!");
// });
app.listen("3000", () => {
    return console.log(`server is listening on https://localhost:3000`);
});
