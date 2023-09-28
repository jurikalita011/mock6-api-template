const express = require("express");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
//signup
userRouter.post("/register", async (req, res) => {
  const { username, avatar, email, password } = req.body;
  try {
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: "unable to sign up", error: err });
      } else {
        const user = await UserModel.create({ ...req.body, password: hash });
        res.status(200).send({ msg: "new user has been created", user: user });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "unable to sign up,please try later",
      error: error.message,
    });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ msg: "unable to sign in", error: err.message });
        } else {
          let token = jwt.sign(
            { userId: user[0]._id, username: user[0].username },
            "secret3"
          );
          res.status(200).send({ msg: "Successfully logged in", token: token });
        }
      });
    } else {
      res.status(400).send({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({
      msg: "unable to sign in,please try again",
      error: error.message,
    });
  }
});

module.exports = userRouter;
