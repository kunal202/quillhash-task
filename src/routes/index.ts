import { Router } from "express";
require("dotenv").config();
const router = Router();
const jwt = require("jsonwebtoken");
import {
  blockuser,
  likeduser,
  createUser,
  verfiyUser,
} from "../controllers/index";

const verifyToken = async (req: any, res: any) => {
  const beareheader = req.headers["authorization"];

  if (typeof beareheader !== undefined) {
    const bearertoken = beareheader?.split(" ")[1];
    req.token = bearertoken;
  } else {
    return res.sendStatus(401);
  }
};

router.post("/login", verifyToken ,async (req, res) => {
  
  if (!req.body.email || !req.body.name || !req.body.password) {
    return res.status(201).send("Incomplete Info");
  }
  const user = await verfiyUser(req, res);
  if (user !== null) {
    const token = jwt.sign(
      {
        email: req.body.email,
        name: req.body.name,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      message: "Auth Successful",
      token: token,
    });
  }
  return res.status(401).json({
    message: "Unauthorized User",
  });
});

router.post("/signup", async (req, res) => {
  if (
    !req.body.id ||
    !req.body.email ||
    !req.body.name ||
    !req.body.password ||
    !req.body.image
  ) {
    return res.status(201).send("Incomplete Info");
  }
  const user = await createUser(req);
  res.status(200).json({
    message: "User Stored Successfully",
  });
});

router.post("/block/:name", async (req, res) => {
  const blockeduser = await blockuser(req.params.name, res);
  if (blockeduser === null) {
    return res.status(401).json({
      message: "unable to find user",
    });
  }
  return res.status(200).json({
    message: "Blocked Succesfully",
  });
});

router.post("/like/:name", async (req, res) => {
  const like = await likeduser(req.params.name);
  if (like === null) {
    return res.status(401).json({
      message: "unable to find user",
    });
  }

  return res.status(200).json({
    message: "Liked Succesfully",
  });
});

export default router;
